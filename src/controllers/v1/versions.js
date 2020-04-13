'use strict';

const GitHubHelper = require('../../helpers/github');



const VersionsController = {

  index: async (request, reply) => {

    // Setup GitHub
    const github = new GitHubHelper(process.env.GITHUB_TOKEN);

    // Get releases
    const releases = await github.getReleases(process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

    // Map result
    const output = releases.map(release => {

      // Get release props
      const { id, html_url, tag_name, name, body, prerelease, created_at, published_at, assets } = release;

      return {
        id,
        url: html_url,
        tag: tag_name,
        name,
        description: body,
        isPrerelease: prerelease,
        createdAt: new Date(created_at),
        publishedAt: new Date(published_at),

        assets: assets.map(asset => {

          // Get asset props
          const { id, name, size, download_count, created_at, updated_at, browser_download_url } = asset;

          return {
            id,
            name,
            size,
            downloadCount: download_count,
            createdAt: created_at,
            updatedAt: updated_at,
            downloadUrl: browser_download_url
          }
        })
      }
    })

    reply.send(output);
  },

  get: (request, reply) => {

    reply.send({
      message: `GET ${request.params.id}`
    });
  }
};



module.exports = VersionsController;