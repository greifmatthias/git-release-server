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
      const { version } = request.params;
      const { platform, environment, dist } = request.query;

      // Get all Releases
      const releases = await github.list();

      if(Object.keys(releases).length === 0) reply.code(204).send();

      // Get Assets for current query in all Releases
      const assets = await github.getAssets(releases, platform, environment, dist, version);

      reply.send(assets);

    } catch ({ status, message }) {

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
      const { version } = request.params;
      const { platform, environment, dist } = request.query;

      // Get all Releases to query
      const releases = await github.list();

      if(Object.keys(releases).length === 0) reply.code(204).send();

      const assets = await github.getAssets(releases, platform, environment, dist, version);

      console.log(assets);

      reply.send(assets);

    } catch ({ status, message }) {

      const err = createError(status || 500);
      err.message = 'Could not list Assets';

      return err;
    }
  },

};



module.exports = AssetsController;