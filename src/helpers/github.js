'use strict';

const { Octokit } = require("@octokit/rest");


class GitHubHelper {

    octokit;

    constructor(token) {

        // Init GitHub API
        this.octokit = new Octokit({
            auth: token
        });
    }

    async getReleases(owner, repo) {

        // List all Releases for repo
        const result = await this.octokit.repos.listReleases({ owner, repo });

        if (!result.data) throw new Error('Could not get Releases');

        return result.data;
    }
}


module.exports = GitHubHelper;