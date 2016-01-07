'use strict';

const mongoose = require('mongoose')
    , Schema   = mongoose.Schema
    , winston  = require('winston');

const logger = new (winston.Logger)({
  level: 'debug',
  transports: [
    new (winston.transports.Console)(),
  ]
});

mongoose.connect('mongodb://localhost/test', {
  db: {
    safe: true
  }
});

mongoose.connection.on('error', err => {
  logger.error("db:", err);
});

mongoose.connection.once('connected', () => {
  var SensorDataChunk = require('./lib/models/sensor-data-chunk.js')
    , resolutions = [3600000, 60000, 1000, 10]
    , root = new SensorDataChunk({
      resolution: resolutions
    });
});
