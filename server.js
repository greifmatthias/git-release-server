#!/usr/bin/env node

const app = require('./src');



// Setup DotEnv
require('dotenv').config();


app()
  .then(app =>
    console.log('Application running at', app.server.address()))
  .catch(e =>
    console.error('Application crashed.', e));