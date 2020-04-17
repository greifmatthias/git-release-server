'use strict';

const ReleasesController = require('../../controllers/v1/releases');
const Release = require('../../models/release.model');



const routes = (fastify, opts, next) => {


  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      query: {
        after: { type: 'string' },
      },
      response: {
        200: {
          type: 'object',
          "patternProperties": {
            ".*": {
                type: 'object',
                properties: Release.getSchema()
            }
          }
        },
        204: {
          description: 'No Releases',
          type: 'null'
        }
      }
    },
    handler: ReleasesController.index
  });



  fastify.route({
    method: 'GET',
    url: '/:release',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: Release.getSchema()
        }
      }
    },
    handler: ReleasesController.get
  });



  next();
};



module.exports = routes;