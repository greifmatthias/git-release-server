'use strict';

const { Octokit } = require("@octokit/rest");
const semver = require('semver');
const fetch = require('node-fetch');
const path = require('path');


const Machine = require('../models/machine.model');
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
        result.data.forEach(x =>
            releases[semver.clean(x.tag_name)] = Release.parseGitHub(x));


        return releases;
    }



    // Get all Releases after a specific version
    async listAfter(version, releases) {

        // List all Releases for repo
        const outReleases = releases || await this.list();

        // Filter out Released before version
        const output = {};
        Object.keys(outReleases).filter(x => semver.gt(x, version)).forEach(release =>
            output[release] = outReleases[release]);


        return output;
    }



    // Get Release by TagName
    async get(name, releases) {

        // List all Releases for repo
        const output = releases || await this.list();


        return ({ [semver.parse(name)]: output[name] });
    }



    // Get the latest Release
    async getLatest(releases) {

        // List all Releases for repo
        const output = releases || await this.list();

        // Get with latest SemVer
        const version = Object.keys(output).reduce((a, b) => semver.gt(a, b) ? a : b);


        return ({ [version]: output[version] });
    }












    // Get a specific Asset
    async getAssets(releases, arch, platform, dist, version) {

        // Check if Release has right Asset
        const assets = {};
        Object.keys(releases).sort((a, b) => semver.gt(a, b) ? -1 : 1).forEach(release => assets[release] = releases[release].assets.filter(asset => {

            const { name } = asset;

            return (
                (version ? name.includes(version) : true) &&                    // Check if file is for current Release (version)
                (platform ? asset.platform === platform : true) &&              // Check if file is for requested environment (osx, win, ..)
                (dist ? dist === asset.dist : true) &&                          // Check if specific dist is set, then compare with extension (deb, rpm, ..)
                (arch ? asset.arch === arch : true)                             // Check if file is for platform (64, arm, ..)
            );
        }));

        // Remove Releases without assets
        Object.keys(assets).forEach(x => { if (assets[x].length === 0) delete assets[x]; });

        
        return assets;
    }


    async downloadAsset(id) {

        const targeturl = await fetch(`https://api.github.com/repos/${this.target.owner}/${this.target.repo}/releases/assets/${id}`, {
            headers: {
                authorization: `token ${process.env.GITHUB_TOKEN}`,
                accept: 'application/octet-stream',
            }
        });

        return new Promise((resolve, reject) =>
            fetch(targeturl.url, {
                headers: {
                    accept: 'application/octet-stream',
                }
            }).then(x => x.buffer()).then(x => resolve(x))
        );
    };
}


module.exports = GitHubHelper;