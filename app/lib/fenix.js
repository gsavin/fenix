'use strict';

var config   = require('./config')
  , fs       = require('fs')
  , path     = require('path')
  , mongoose = require('mongoose')
  , winston  = require('winston');

const MODULES = ['sensors'];
const COMPONENTS = ['sensors-list', 'sensor-panel'];

function initFenixApp(fenix) {
  return function(resolve, reject) {
    fenix.logger.debug("start initialize fenix");

    if (fenix.loaded) {
      //
      // Already loaded...
      //
      fenix.logger.debug("already loaded");
      resolve();
    }

    fenix.loaded = true;

    /*
     * Loading the database...
     */

    mongoose.connect(config.db.DB_URI, config.db.DB_OPTIONS);

    var db = mongoose.connection;
    fenix.db = db;

    db.on('error', err => {
      fenix.logger.error("db:", err);
      reject(err);
    });

    db.once('connected', () => {
      fenix.logger.debug("db connected");

      var modelsPath = path.join(__dirname, 'models');
      fs.readdirSync(modelsPath).forEach(file => {
        if (/(.*)\.(js$|coffee$)/.test(file)) {
          require(path.join(modelsPath, file));
          fenix.logger.info("model \"" + path.join(modelsPath, file) + "\" loaded");
        }
      });

      try {
        loadModules(fenix);
        loadComponents(fenix);
        loadAngular(fenix);

        resolve();
      }
      catch(err) {
        reject(err);
      }
    });
  };
}

function loadComponents(fenix) {
  COMPONENTS.forEach(name => {
    try {
      require(`./components/${name}.js`);
      fenix.logger.debug(`components "./components/${name}.js" loaded`);
    }
    catch(err) {
      fenix.logger.error(`failed to load "./components/${name}.js"`, err);
    }
  });
}

function loadModules(fenix) {
  MODULES.forEach(name => {
    try {
     let mod = require(`./modules/${name}.js`);
     fenix.modules[name] = mod;

     mod.init();

     fenix.logger.debug(`module "./modules/${name}.js" loaded`);
   }
   catch(err) {
     fenix.logger.error(`failed to load "./modules/${name}.js"`, err);
   }
 });
}

function loadAngular(fenix) {
  var angular  = require('angular')
    , router   = require('angular-route');

  angular.module('fenix', [
    'ngRoute'
  ])
  .factory('shared', function() {
    return {
    };
  })
  .factory('fenix', () => {
    return fenix;
  })
  /*
  * Configuration du module principal. Les différentes routes sont configurées
  * ici.
  */
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('#');

    $routeProvider
    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginCtrl'
    })
    .otherwise({
      //redirectTo: '/'
      templateUrl: 'views/partials/main.html',
      //controller: 'MapCtrl'
    });
  }]);
}

class FenixApp {
  constructor() {
    this.config = config;
    this.loaded = false;
    this.modules = {};

    this._logger = new (winston.Logger)({
      level: 'debug',
      transports: [
        new (winston.transports.Console)(),
      ]
    });
  }

  get logger() {
    return this._logger;
  }

  init() {
    return new Promise(initFenixApp(this));
  }

  setTemplate (element, templateName) {
    var template = document.querySelector('#template-' + templateName)
      , clone    = document.importNode(template.content, true);

    element.appendChild(clone);
  }
}

module.exports = new FenixApp();
