'use strict';


const releases = require('./releases');
const assets = require('./assets');



const routes = [
  {
    prefix: '/releases',
    routes: releases
  },
  {
    prefix: '/assets',
    routes: assets
  }
];



module.exports = routes;