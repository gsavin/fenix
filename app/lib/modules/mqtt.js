'use strict';

const mqtt          = require('mqtt')
    , EventEmitter  = require('events')
    , config        = require('../config')
    , ipc           = require('ipc')
    , logger        = require('../logger.js')
    , fenix         = require('../fenix');

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
  }

  init() {
    return new Promise((resolve, reject) => {
      ipc.on('/mqtt/connect', (event, arg) => {
        this.connect(arg);
      });

      resolve();
    });
  }

  connect(uri) {
    logger.info('connecting to', uri);

    fenix.send('/mqtt/status', 'connecting');

    return new Promise((resolve, reject) => {
      const todo = () => {
        this._client = mqtt.connect(uri);

        this._client.on('connect', () => {
          this._client.subscribe('/sensors/+');
          fenix.send('/mqtt/status', 'connected');

          resolve();
        });

        this._client.on('error', () => {
          fenix.send('/mqtt/status', 'error');
          reject();
        });

        this._client.on('reconnect', () => {
          fenix.send('/mqtt/status', 'connecting');
        });

        this._client.on('close', () => {
          fenix.send('/mqtt/status', 'disconnected');
        });

        this._client.on('offline', () => {
          fenix.send('/mqtt/status', 'disconnected');
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

                fenix.send('/mqtt/sensors-add', m[1]);
              }


            }
            else {
              //
              // Data
              //
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
