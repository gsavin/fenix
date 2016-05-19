'use strict';

var config   = require('./config')
  , winston  = require('winston');

module.exports = new (winston.Logger)({
  level: config.get("logger").level,
  transports: [
    new (winston.transports.Console)(),
  ]
});
