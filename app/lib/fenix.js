'use strict';

var config   = require('./config')
  , fs       = require('fs')
  , path     = require('path')
  , mongoose = require('mongoose');

const MODULES = ['sensors'];

class FenixApp {
  constructor() {
    this.config = config;
    this.loaded = false;
    this.modules = {};
  }

  init() {
    if (this.loaded) {
      //
      // Already loaded...
      //
      return this;
    }

    this.loaded = true;

    /*
     * Loading the database...
     */

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

    /*
     * Loading modules...
     */

    MODULES.forEach(name => {
     let mod = require(`./modules/${name}.js`);
     this.modules[name] = mod;

     mod.init();
    });

    /*
     * Loading the AngularJS part...
     */

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
      return this;
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

    require('./components/sensors_list.js');

    return this;
  }
}

module.exports = new FenixApp();
