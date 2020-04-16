'use strict';

const { Octokit } = require("@octokit/rest");
const semver = require('semver');

const Release = require('../models/release.model');



class GitHubHelper {


    octokit;

    target;



    constructor(token, owner, repo) {

        // Init GitHub API
        this.octokit = new Octokit({
            auth: token
        });

        this.target = { owner, repo };
    }



    // Get all Releases
    async list() {

        // List all Releases for repo
        let result = await this.octokit.repos.listReleases(this.target);

        // Map result
        const releases = {};

        result.data.forEach(x => releases[x.tag_name] = Release.parseGitHub(x));


        return releases;
    }



    // Get all Releases after a specific version
    async listAfter(version, releases) {

        // List all Releases for repo
        const outReleases = releases || await this.list();

        // Filter out Released after version
        const result = Object.keys(outReleases).filter(x => semver.gt(x, version));


        return result.map(x => outReleases[x]);
    }



    // Get Release by TagName
    async get(tagname, releases) {

        // List all Releases for repo
        const outReleases = releases || await this.list();

        // Filter out Released after version
        const release = outReleases[tagname];


        return release;
    }



    // Get the latest Release
    async getLatest(releases) {

        // List all Releases for repo
        const outReleases = releases || await this.list();

        // Get latest
        const release = Object.keys(outReleases).reduce((a, b) => semver.gt(a, b) ? a : b);

        return outReleases[release];
    }
}


module.exports = GitHubHelper;