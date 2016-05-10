'use strict';

const mongoose      = require('mongoose')
    , EventEmitter  = require('events')
    , config        = require('../config')
    , logger        = require('../logger');

class DBModule {
  init() {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.db.uri, config.db.options);

      this.db = mongoose.connection;

      this.db.on('error', reject);

      this.db.once('connected', () => {
        logger.debug("db connected");

        var modelsPath = path.join(__dirname, 'models');
        fs.readdirSync(modelsPath).forEach(file => {
          if (/(.*)\.(js$|coffee$)/.test(file)) {
            require(path.join(modelsPath, file));
            logger.info("model \"" + path.join(modelsPath, file) + "\" loaded");
          }
        });

        resolve();
      });
    });
  }

  get name() {
    return "db";
  }

  get priority() {
    return 0;
  }
}

module.exports = new DBModule();
