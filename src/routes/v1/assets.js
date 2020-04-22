'use strict';

const AssetsController = require('../../controllers/v1/assets');
const Asset = require('../../models/asset.model');



const routes = (fastify, opts, next) => {


  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      query: {
        arch: { type: 'string' },
        platform: { type: 'string' },
        dist: { type: 'string' }
      },
      response: {
        200: {
          type: 'object',
          "patternProperties": {
            ".*": {
              type: 'array',
              items: {
                type: 'object',
                properties: Asset.getSchema()
              }
            }
          }
        },
        204: {
          description: 'No Assets',
          type: 'null'
        }
      }
    },
    handler: AssetsController.index
  });



  fastify.route({
    method: 'GET',
    url: '/:release',
    schema: {
      query: {
        arch: { type: 'string' },
        platform: { type: 'string' },
        dist: { type: 'string' },
        output: { type:'string' }
      },
      rresponse: {
        200: {
          type: 'object',
          "patternProperties": {
            ".*": {
              type: 'array',
              items: {
                type: 'object',
                properties: Asset.getSchema()
              }
            }
          }
        },
        204: {
          description: 'No Assets',
          type: 'null'
        }
      }
    },
    handler: AssetsController.get
  });



  next();
};



module.exports = routes;