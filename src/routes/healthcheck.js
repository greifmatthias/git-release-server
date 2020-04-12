'use strict';

const HealthCheckController = require('../controllers/healthcheck');



const routes = (fastify, opts, next) => {

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: {
              type: 'string'
            }
          }
        }
      }
    },
    handler: HealthCheckController.index
  });

  next();
};



module.exports = routes;