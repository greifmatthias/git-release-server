'use strict';

var createError = require('http-errors')

const GitHubHelper = require('../../helpers/github');



const VersionsController = {

  index: async (request, reply) => {
    try {

      // Setup GitHub
      const github = new GitHubHelper(process.env.GITHUB_TOKEN, process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

      // Get releases
      const releases = await github.getReleases();

      // Check result
      if (releases.length === 0) reply.code(204).send();

      // Map result
      const output = Object.keys(releases).map(release => {

        const { url, tag, name, isPrerelease, publishedAt, assets } = releases[release];

        return {
          url, tag, name, isPrerelease, publishedAt,
          assets: assets.map(({ name, size, downloadUrl }) => ({ name, size, downloadUrl }))
        };
      });


      reply.send(output);

    } catch ({ status, message }) {

      const err = createError(status || 500);
      err.message = 'Could not list Releases';

      return err;
    }
  },

  get: (request, reply) => {

    reply.send({
      message: `GET ${request.params.id}`
    });
  }
};



module.exports = VersionsController;