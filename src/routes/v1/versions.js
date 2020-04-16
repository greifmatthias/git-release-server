'use strict';

const VersionsController = require('../../controllers/v1/versions');

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
          type: 'array',
          items: {
            type: 'object',
            properties: Release.getSchema()
          }
        },
        204: {
          description: 'No Releases',
          type: 'null'
        }
      }
    },
    handler: VersionsController.index
  });



  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: Release.getSchema()
        }
      }
    },
    handler: VersionsController.get
  });


  next();
};



module.exports = routes;