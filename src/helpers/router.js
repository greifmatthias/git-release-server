'use strict';



const Router = {

  route: (app, routers, prefix = '') => {

    routers.forEach((router) => {

      if (router.routes instanceof Array)
        return Router.route(app, router.routes, router.prefix);

      if (router.routes instanceof Function)
        app.register(router.routes, {
          prefix: `${prefix || ''}${router.prefix || ''}`
        });
    });
  },

  dumpRoute: (app) => {

    console.log('======= ROUTES =======');

    app.routes.forEach(x => {

      const route = x[Object.keys(x)[0]];
      console.log(`${route.method} ~ ${route.url}`);
    });

    console.log('======================');
  }
};



module.exports = Router;