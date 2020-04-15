'use strict';

const { Octokit } = require("@octokit/rest");
const semver = require('semver');


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



    async getReleases() {

        // List all Releases for repo
        const result = await this.octokit.repos.listReleases(this.target);

        // Map result
        const releases = {};

        result.data.forEach(({ id, html_url, tag_name, name, body, prerelease, created_at, published_at, assets }) => {

            releases[tag_name] = {
                id,
                url: html_url,
                tag: tag_name,
                name,
                description: body,
                isPrerelease: prerelease,
                createdAt: new Date(created_at),
                publishedAt: new Date(published_at),

                assets: assets.map(({ id, name, size, download_count, created_at, updated_at, browser_download_url }) =>
                    ({ id, name, size, downloadCount: download_count, createdAt: created_at, updatedAt: updated_at, downloadUrl: browser_download_url }))
            }
        });


        return releases;
    }



    async getReleasesAfter(releases, version) {

        // List all Releases for repo
        const outReleases = releases || await this.getReleases();

        // Filter out Released after version
        const result = Object.keys(outReleases).filter(x => semver.gt(x, version));

        return result.map(x => outReleases[x]);
    }
}


module.exports = GitHubHelper;