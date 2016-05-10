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
    uri:  'mongodb://localhost/firediag-production',
    name: 'firediag-production'
  }
};
