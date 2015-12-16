'use strict';

const config   = require('./config')
    , mongoose = require('mongoose')
    , winston  = require('winston')
    , path     = require('path')
    , fs       = require('fs')
    , uuid     = require('uuid')
    , logger   = require('./logger.js');

class FenixDB {
  constructor() {
    this._db = false;
  }
  
  get db() {
    return this._db;
  }
  
  connect() {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        mongoose.connect(config.db.DB_URI, config.db.DB_OPTIONS);

        this._db = mongoose.connection;

        this._db.on('error', err => {
          logger.error("db:", err);
          reject(err);
        });
        
        this._db.once('connected', () => {
          let modelsPath = path.join(__dirname, 'models');
          this.loadModels(modelsPath);
          
          resolve();
        });
      }
      else {
        resolve();
      }
    })
  }
  
  loadModels(modelsPath) {
    fs.readdirSync(modelsPath).forEach(file => {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(path.join(modelsPath, file));
        logger.debug("model \"" + path.relative(__dirname, path.join(modelsPath, file)) + "\" loaded");
      }
    });
  }
  
  getModel(name) {
    return mongoose.model(name);
  }
}

module.exports = new FenixDB();
