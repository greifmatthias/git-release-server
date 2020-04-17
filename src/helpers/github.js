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
            releases[x.tag_name] = Release.parseGitHub(x));


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


        return output[name];
    }



    // Get the latest Release
    async getLatest(releases) {

        // List all Releases for repo
        const output = releases || await this.list();

        // Get with latest SemVer
        const version = Object.keys(output).reduce((a, b) => semver.gt(a, b) ? a : b);


        return output[version];
    }










    

    // Get a specific Asset
    async getAssets(releases, platform, environment, dist, version) {
        
        // Check if Release has right Asset
        const assets = {};
        
        Object.keys(releases).forEach(release => assets[release] = releases[release].assets.filter(asset => {

            const { name } = asset;
            const ext = path.extname(name).replace('.', '');

            // Check if extension of Asset can be linked to environment
            const assetEnv = Machine.getExtensions()[ext];


            return (
                (version ? name.includes(version) : true) &&            // Check if file is for current Release (version)
                assetEnv === environment &&                             // Check if file is for requested environment (osx, win, ..)
                (dist ? dist === ext : true) &&                         // Check if specific dist is set, then compare with extension (deb, rpm, ..)
                name.includes(platform.replace('x', ''))                // Check if file is for platform (64, arm, ..)
            );
        }));

        // Remove Releases without assets
        Object.keys(assets).forEach(x => { if(assets[x].length === 0) delete assets[x]; });

        
        return assets;
    }


    // downloadAsset(id) {

    //     const targeturl = await fetch(`https://api.github.com/repos/${this.target.owner}/${this.target.repo}/releases/assets/${id}`, {
    //         headers: {
    //             authorization: `token ${process.env.GITHUB_TOKEN}`,
    //             accept: 'application/octet-stream',
    //         }
    //     });
        
    //     return new Promise((resolve, reject) =>
    //         fetch(targeturl.url, {
    //             headers: {
    //                 accept: 'application/octet-stream',
    //             }
    //         }).then(x => x.buffer()).then(x => resolve(x))
    //     );
    // };
}


module.exports = GitHubHelper;