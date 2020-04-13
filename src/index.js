'use strict';

const fastify = require('fastify');


const Plugins = require('./plugins');
const Router = require('./helpers/router');

const routes = require('./routes');



module.exports = (port) => {

  return new Promise((resolve, reject) => {

    const app = fastify();

    app.register(require('fastify-routes'));

    Plugins(app);

    Router.route(app, routes);

    app.ready(() => Router.dumpRoute(app));

    app.listen(port || process.env.PORT || 3000, (err) => {
      if (err) return reject(err);

      resolve(app);
    });

    app.server.once('error', reject);
  });
};