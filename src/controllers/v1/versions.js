'use strict';

var createError = require('http-errors')

const GitHubHelper = require('../../helpers/github');



const VersionsController = {

  index: async (request, reply) => {
    try {

      const { after } = request.query;

      // Setup GitHub
      const github = new GitHubHelper(process.env.GITHUB_TOKEN, process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

      // Get releases
      let releases = await github.list();

      // Check if need to narrow result
      if (after) releases = await github.listAfter(after, releases);

      // Check result
      if (releases.length === 0) reply.code(204).send();

      // Map result
      const output = Object.keys(releases).map(release => {

        const { url, version, name, isPrerelease, publishedAt, assets } = releases[release];

        return {
          url, version, name, isPrerelease, publishedAt,
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



  get: async (request, reply) => {
    try {

      // Setup GitHub
      const github = new GitHubHelper(process.env.GITHUB_TOKEN, process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

      // Get id
      const { id } = request.params;

      let release;

      if (id === 'latest') release = await github.getLatest();
      else release = await github.get(id);

      // Check result
      if (!release)
        if (id === 'latest') reply.code(204).send();
        else return createError.NotFound();


      reply.send(release);

    } catch ({ status, message }) {

      const err = createError(status || 500);
      err.message = 'Could not list Releases';

      return err;
    }
  }
};



module.exports = VersionsController;