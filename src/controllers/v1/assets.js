'use strict';

const createError = require('http-errors');
const fetch = require('node-fetch');


const GitHubHelper = require('../../helpers/github');



const AssetsController = {


  index: async (request, reply) => {
    try {

      // Setup GitHub
      const github = new GitHubHelper(process.env.GITHUB_TOKEN, process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

      // Get version
      const { arch, platform, dist } = request.query;

      // Get all Releases
      const releases = await github.list();

      if(Object.keys(releases).length === 0) reply.code(204).send();

      // Get Assets for current query in all Releases
      const assets = await github.getAssets(releases, arch, platform, dist);


      reply.send(assets);

    } catch ({ status, message }) {

      console.log(message);

      const err = createError(status || 500);
      err.message = 'Could not list Assets';

      return err;
    }
  },



  get: async (request, reply) => {
    try {

      // Setup GitHub
      const github = new GitHubHelper(process.env.GITHUB_TOKEN, process.env.GITHUB_USERNAME, process.env.GITHUB_REPO);

      // Get version
      const { release } = request.params;
      const { platform, dist, arch, output } = request.query;

      // Get all Releases to query
      let result;
      if (release === 'latest') result = await github.getLatest();
      else result = await github.get(release);

      // Check result
      if (!result)
        if (release === 'latest') return reply.code(204).send();
        else return createError.NotFound();
        
      const assets = await github.getAssets(result, platform, dist, arch);

      const firstEntry = assets[Object.keys(assets)[0]];
      if(output === 'file' && firstEntry.length === 1)
        reply.send(await github.downloadAsset(firstEntry[0].id));
      else return reply.send(assets);
    } catch ({ status, message }) {

      console.log(message)

      const err = createError(status || 500);
      err.message = 'Could not list Assets';

      return err;
    }
  },

};



module.exports = AssetsController;