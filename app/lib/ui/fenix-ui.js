'use strict';

const logger    = require('../logger.js')
    , fenixAPI  = require('./api.js');

const React = require('react');
const ReactDOM = require('react-dom');

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
    logger.info('loading components');

    const router          = require('./router.js')
        , RouterProvider  = require('react-router5').RouterProvider
        , App             = require('./components/app.jsx');

    router.start(() => {
      ReactDOM.render(
        <RouterProvider router={ router }><App/></RouterProvider>,
        document.getElementById('container')
      );
    });
  }

  loadComponents() {
    return new Promise(function(resolve, reject) {
      logger.info('loading components');

      const MQTTConnectionManager = require('./components/mqtt-connection-manager.jsx')
          , MQTTSensorsList       = require('./components/mqtt-sensors-list.jsx');


      /*reactDOM.render(
        <MQTTConnectionManager/>,
        document.getElementById('mqtt-connection-manager')
      );

      reactDOM.render(
        <MQTTSensorsList/>,
        document.getElementById('mqtt-sensors-list')
      );*/

      resolve();
    });
  }
}

module.exports = new FenixUI();
