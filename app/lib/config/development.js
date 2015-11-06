'use strict';

module.exports = {
  ENV: 'development',

  SSL_ON: true,
  SSL_PRIVATE_KEY: 'ssl/firediag.key',
  SSL_CERTIFICATE: 'ssl/firediag.crt',

  CHECK_ADMIN_ACCOUNT: true,

  db: {
    DB_URI: 'mongodb://localhost/firediag-development',
    DB_NAME: 'firediag-development'
  }
};
