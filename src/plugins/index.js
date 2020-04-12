'use strict';

const RequestLogger = require('./request_logger');



module.exports = (app) => {

  RequestLogger(app);
};