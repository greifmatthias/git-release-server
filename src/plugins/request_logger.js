'use strict';



module.exports = (app) => {

  app.addHook('onRequest', (req, res, next) => {

    const { raw: { method, url } } = req;

    console.log(`${method} ${url}`);

    next();
  });
};