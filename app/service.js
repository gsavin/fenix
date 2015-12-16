'use strict';

const config   = require('./lib/config')
    , logger   = require('./lib/logger.js')
    , path     = require('path')
    , db       = require('./lib/db.js');

const ALGORITHMS = ['short-long-mean'];

class FenixService {
  constructor() {
    this.algorithms = {};
  }
  
  init() {
    db.loadModels(path.join(__dirname, 'service', 'models'));
    
    ALGORITHMS.forEach(algorithmName => {
      try {
       let mod = require(`./service/algorithms/${algorithmName}.js`);
       this.algorithms[algorithmName] = mod;

       logger.debug(`algorithm "./service/algorithms/${algorithmName}.js" loaded`);
     }
     catch(err) {
       logger.error(`failed to load "./service/algorithms/${algorithmName}.js"`, err);
     }
    });
    
    logger.info("Service started.");
  }
  
  fail() {
    logger.error("Unable to start the service.");
  }
}

var service = new FenixService();

db.connect().then(function() {
  service.init();
}, function() {
  service.fail();
});

module.exports = service;
