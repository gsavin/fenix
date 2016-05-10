'use strict';

module.exports = {
  ENV: 'development',

  SSL_ON: true,
  SSL_PRIVATE_KEY: 'ssl/firediag.key',
  SSL_CERTIFICATE: 'ssl/firediag.crt',

  CHECK_ADMIN_ACCOUNT: true,

  logger: {
    level: 'debug'
  },

  db: {
    uri:  'mongodb://localhost/firediag-development',
    name: 'firediag-development'
  }
};
