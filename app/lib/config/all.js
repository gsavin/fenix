'use strict';

var path     = require('path')
  , rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  ROOT_PATH: rootPath,

  SERVER_IP: '0.0.0.0',
  SERVER_PORT: process.env.PORT || 8000,

  SESSION_SECRET: '1b53bf3bb05e113e75b8',

  logger: {
    level: 'info'
  },

  db: {
    options: {
      db: {
        safe: true
      }
    }
  },

  STATIC_ROUTES: {
    '/scripts' : 'app/scripts',
    '/css'     : 'app/styles',
    '/img'     : 'app/images',
    '/fonts'   : 'app/fonts',

    '/favicon.ico': 'app/favicon.ico',
    '/favicon.png': 'app/favicon.png'
  },

  mqtt: {
    uri: 'mqtt://192.168.1.243'
  },

  IO_PATH: "/api/io/"
};
