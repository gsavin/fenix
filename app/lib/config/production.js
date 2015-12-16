'use strict';

module.exports = {
  ENV: 'production',

  SSL_ON: true,
  SSL_PRIVATE_KEY: 'ssl/firediag.key',
  SSL_CERTIFICATE: 'ssl/firediag.crt',

  logger: {
    level: 'error'
  },

  db: {
    DB_URI: 'mongodb://localhost/firediag-production',
    DB_NAME: 'firediag-production'
  }
};
