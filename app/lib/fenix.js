'use strict';

var config   = require('./config')
  , fs       = require('fs')
  , path     = require('path')
  , mongoose = require('mongoose');

function Fenix() {
  this.config = config;
}

Fenix.prototype.loadDb = function() {
  if (this.db) {
    //
    // Already loaded...
    //
    return this;
  }

  mongoose.connect(config.db.DB_URI, config.db.DB_OPTIONS);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  var modelsPath = path.join(__dirname, 'models');
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
      require(modelsPath + '/' + file);
    }
  });

  this.db = db;
  return this;
};

var f = new Fenix();
module.exports = f;
