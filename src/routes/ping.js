'use strict';

const PingController = require('../controllers/ping');



const routes = (fastify, opts, next) => {

  fastify.route({
    method: 'GET',
    url: '/ping',
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
    handler: PingController.ping
  });

  next();
};



module.exports = routes;