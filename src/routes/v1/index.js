'use strict';

const versions = require('./versions');



const routes = [{
  prefix: '/versions',
  routes: versions
}];



module.exports = routes;