'use strict';


const ping = require('./ping');
const v1 = require('./v1');



const routers = [
  {
    routes: ping
  },
  {
    prefix: '/v1',
    routes: v1
  }
];



module.exports = routers;