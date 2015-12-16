'use strict';

module.exports = {
  ENV: 'test',

  SSL_ON: true,
  SSL_PRIVATE_KEY: 'ssl/firediag.key',
  SSL_CERTIFICATE: 'ssl/firediag.crt',

  CHECK_ADMIN_ACCOUNT: true,

  logger: {
    level: 'info'
  },

  db: {
    DB_URI: 'mongodb://localhost/firediag-test',
    DB_NAME: 'firediag-test'
  }
};
