'use strict';

const logger = require('./logger.js');

const COMPONENTS = [
//  'sensors-list',
//  'sensor-panel',
  'mqtt-connection-manager'
];

class FenixUI {
  get logger() {
    return logger;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loadComponents()
        .then(() => { return this.loadAngular(); }, reject)
        .then(resolve, reject);
    });
  }

  loadComponents() {
    return new Promise(function(resolve, reject) {
      logger.info('loading components');

      COMPONENTS.forEach(name => {
        try {
          require(`./components/${name}.js`);
          logger.debug(`components "./components/${name}.js" loaded`);
        }
        catch(err) {
          logger.error(`failed to load "./components/${name}.js"`, err);
        }
      });

      resolve();
    });
  }

  loadAngular() {
    return new Promise(function(resolve, reject) {
      logger.info('loading angular');

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
        $locationProvider.html5Mode(true).hashPrefix('#');

        $routeProvider
        .when('/:part', {
          templateUrl: function (params) {
            let part = params['part'];

            if (part[0] == '.') {
              part = 'main';
            }

            return 'views/partials/' + part + '.html';
          }
        })
        .otherwise({
          //redirectTo: '/'
          templateUrl: 'views/partials/main.html',
          //controller: 'MapCtrl'
        });
      }]);

      resolve();
    });
  }
}

module.exports = new FenixUI();
