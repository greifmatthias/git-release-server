'use strict';

const VersionsController = require('../../controllers/v1/versions');



// MODELS
const assetBody = {

  id: { type: 'string' },
  name: { type: 'string' },
  size: { type: 'integer' },
  downloadCount: { type: 'integer' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  downloadUrl: { type: 'string' }
};

const releaseBody = {

  id: { type: 'string' },
  url: { type: 'string' },
  tag: { type: 'string' },
  name: { type: 'string' },
  description: { type: 'string' },
  isPrerelease: { type: 'boolean' },
  createdAt: { type: 'string', format: 'date-time' },
  publishedAt: { type: 'string', format: 'date-time' },
  assets: {
    type: 'array',
    items: {
      type: 'object',
      properties: assetBody
    }
  }
};



const routes = (fastify, opts, next) => {

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: releaseBody
          }
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
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    handler: VersionsController.get
  });

  next();
};



module.exports = routes;