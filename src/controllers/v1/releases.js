'use strict';

var createError = require('http-errors')

const GitHubHelper = require('../../helpers/github');



const ReleasesController = {

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
      if (Object.keys(releases).length === 0) return reply.code(204).send();

      // Strip result
      const output = {};
      Object.keys(releases).forEach(release => {

        const { url, name, isPrerelease, publishedAt, assets } = releases[release];
        
        output[release] = {
          url, name, isPrerelease, publishedAt,
          assets: assets.map(({ name, size, arch, platform, dist }) => ({ name, size, arch, platform, dist }))
        }
      });


      return reply.send(output);

    } catch ({ status, message }) {

      console.log(message)

      const err = createError(status || 500);
      err.message = 'Could not list Releases';

      return err;
    }
  },



  get: async (request, reply) => {
    try {

      // Get requested Release
      const { release } = request.params;

      // Setup GitHub
      const github = new GitHubHelper(process.env.GITHUB_TOKEN, process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

      // Get details for Release
      let result;
      if (release === 'latest') result = await github.getLatest();
      else result = await github.get(release);

      // Check result
      if (!result)
        if (release === 'latest') return reply.code(204).send();
        else return createError.NotFound();


      return reply.send(result);
    } catch ({ status, message }) {

      console.log(message)

      const err = createError(status || 500);
      err.message = 'Could not list Releases';

      return err;
    }
  }
};



module.exports = ReleasesController;