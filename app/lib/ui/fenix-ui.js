'use strict';

const logger    = require('../logger.js')
    , fenixAPI  = require('./api.js');

const React = require('react');
const reactDOM = require('react-dom');

const COMPONENTS = [
//  'sensors-list',
//  'sensor-panel',
  'mqtt-connection-manager',
  'mqtt-sensors-list'
];

class FenixUI {
  get logger() {
    return logger;
  }

  get api() {
    return fenixAPI;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loadComponents()
        .catch(err => { logger.error(err); reject(); })
        //.then(() => { return this.loadAngular(); }, reject)
        .then(resolve, reject)
          .catch(err => { logger.error(err); reject(); });
    });
  }

  loadComponents() {
    return new Promise(function(resolve, reject) {
      logger.info('loading components');

      /*COMPONENTS.forEach(name => {
        try {
          require(`./components/${name}.js`);
          logger.debug(`components "./components/${name}.js" loaded`);
        }
        catch(err) {
          logger.error(`failed to load "./components/${name}.js"`, err);
        }
      });*/

      const MQTTConnectionManager = require('./components/mqtt-connection-manager.jsx')
          , MQTTSensorsList       = require('./components/mqtt-sensors-list.jsx');

      reactDOM.render(
        <MQTTConnectionManager/>,
        document.getElementById('mqtt-connection-manager')
      );

      reactDOM.render(
        <MQTTSensorsList/>,
        document.getElementById('mqtt-sensors-list')
      );

      resolve();
    });
  }
}

module.exports = new FenixUI();
