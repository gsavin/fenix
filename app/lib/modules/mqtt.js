'use strict';

const mqtt          = require('mqtt')
    , EventEmitter  = require('events')
    , config        = require('../config')
    , ipc           = require('ipc')
    , logger        = require('../logger.js')
    , fenix         = require('../fenix')
    , merge         = require('lodash').merge;

class MQTTSensor {
  constructor(name) {
    this.name = name;
    this.lastPresence = Date.now();
  }

  updateLastPresence() {
    this.lastPresence = Date.now();
  }
}

class MQTTModule extends EventEmitter {
  constructor() {
    super();

    this.sensors = {};

    this.state = {
      status: 'disconnected',
      uri: '',
      error: null
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      ipc.on('/mqtt/action/connect', (event, arg) => {
        this.connect(arg);
      });

      ipc.on('/mqtt/action/disconnect', (event, arg) => {
        this.disconnect();
      });

      resolve();
    });
  }

  setState(state) {
    this.state = merge(this.state, state);
    fenix.send('/mqtt/state', this.state);
  }

  connect(uri) {
    logger.info('connecting to', uri);

    this.setState({
      status: 'connecting',
      uri: uri
    });

    return new Promise((resolve, reject) => {
      const todo = () => {
        this._client = mqtt.connect(uri);

        this._client.on('connect', () => {
          this._client.subscribe('/sensors/+');

          this.setState({
            status: 'connected',
            uri: uri
          });

          resolve();
        });

        this._client.on('error', error => {
          this.setState({
            status: 'error',
            error: error
          });

          reject();
        });

        this._client.on('reconnect', () => {
          this.setState({
            status: 'connecting'
          });
        });

        this._client.on('close', () => {
          this.setState({
            status: 'disconnected'
          });
        });

        this._client.on('offline', () => {
          this.setState({
            status: 'disconnected'
          });
        });

        this._client.on('message', (topic, message, packet) => {
          const re = /^\/sensors\/([^/]+)(?:\/(.*))?$/
              , m  = re.exec(topic);

          if (m != null) {
            if (m[2] == undefined) {
              //
              // Presence
              //

              let sensorName  = m[1]
                , sensor      = this.sensors[sensorName];

              if (sensor == undefined) {
                sensor = new MQTTSensor(sensorName);
                this.sensors[sensorName] = sensor;

                fenix.send('/mqtt/sensors', this.sensors);
              }

              sensor.updateLastPresence();
            }
            else {
              //
              // Data
              //

              logger.debug('data');
            }
          }
        });
      };

      if (this._client != undefined) {
        this._client.removeAllListeners();
        this._client.end(todo);
      }
      else {
        todo();
      }
    });
  }

  disconnect() {
    if (this._client != undefined) {
      this._client.end(() => {
        this._client.removeAllListeners();

        this.setState({
          status: 'disconnected'
        });
      });
    }
  }

  get name() {
    return "mqtt";
  }

  get priority() {
    return 10;
  }

  get client() {
    return this._client;
  }
}

module.exports = new MQTTModule();
