/*
 * Copyright 2016
 *    Guilhelm Savin <guilhelm.savin@litislab.fr>
 *
 * This file is part of Fenix.
 *
 * This program is free software distributed under the terms of the CeCILL-B
 * license that fits European law. You can  use, modify and/ or redistribute
 * the software under the terms of the CeCILL-B license as circulated by CEA,
 * CNRS and INRIA at the following URL <http://www.cecill.info>.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.
 *
 * You should have received a copy of the CeCILL-B License along with this program.
 * If not, see <http://www.cecill.info/licences/>.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept their terms.
 */
'use strict';

const mqtt          = require('mqtt')
    , EventEmitter  = require('events')
    , merge         = require('lodash').merge
    , ipc           = require('electron').ipcMain
    , config        = require('../config')
    , logger        = require('../logger.js')
    , fenix         = require('../fenix');

class MQTTSensorType {
  constructor(type) {
    this.type = type;
    this.value = '';
  }
}

/**
 * An MQTT sensor.
 *
 * It is described by a name, and a list of sensor-data-types (such temperature,
 * humidity...).
 *
 */
class MQTTSensor {
  constructor(name) {
    this.name         = name;
    this.types        = {};
    this.subscribed   = false;
    this.lastPresence = Date.now();
  }

  updateLastPresence() {
    this.lastPresence = Date.now();
  }

  getOrCreateType(type) {
    let t = this.types[type];

    if (!t) {
      t = new MQTTSensorType(type);
      this.types[type] = t;
    }

    return t;
  }
}

/**
 * The MQTT module.
 *
 * It handles MQTT topic user will subscribed to. It can be controlled sending
 * appropriate action through the ipc service. All actions are '/mqtt' prefixed.
 *
 * List of actions :
 *
 * /mqtt/action/connect     Connect to a MQTT server. It takes one argument which is
 *                          the serveur uri.
 *
 * /mqtt/action/disconnect  Disconnect from the actual MQTT server.
 *
 * /mqtt/action/refresh     Send the state and the sensors list back through the ipc
 *                          service.
 *
 * State of the module is sent through ipc using '/mqtt/state' action name. Sensors
 * list is sent using '/mqtt/sensors'.
 *
 */
class MQTTModule extends EventEmitter {
  constructor() {
    super();

    this.sensors = {};

    this.state = {
      status: 'disconnected',
      uri: {
        host: '',
        scheme: ''
      },
      error: null
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      ipc.on('/mqtt/action/connect', (event, server) => {
        this.connect(server.scheme, server.host);
      });

      ipc.on('/mqtt/action/disconnect', (event, arg) => {
        this.disconnect();
      });

      ipc.on('/mqtt/state/get', (event) => {
        event.returnValue = this.state;
      });

      ipc.on('/mqtt/sensors/get', (event) => {
        event.returnValue = this.sensors;
      });

      ipc.on('/mqtt/servers/add', (event, name, server) => {
        fenix.config.set(`mqtt.servers.${name}`, server, true);
        fenix.send('/mqtt/servers', fenix.config.get('mqtt.servers'));
      });

      ipc.on('/mqtt/servers/get', (event) => {
        event.returnValue = fenix.config.get('mqtt.servers', {});
      });

      ipc.on('/mqtt/action/refresh', (event, arg) => {
        fenix.send('/mqtt/state', this.state);
        fenix.send('/mqtt/sensors', this.sensors);
      });

      ipc.on('/mqtt/action/subscribe', (event, arg) => {
        let sensor = this.sensors[arg];

        if (sensor == undefined) {
          fenix.send('/mqtt/error', 'sensor not found');
        }
        else if (!sensor.subscribed) {
          sensor.subscribed = true;

          if (this.state.status != 'connected') {
            fenix.send('/mqtt/error', 'not connected');
          }
          else {
            this.client.subscribe('/sensors/' + arg + '/#');
          }

          fenix.send('/mqtt/sensor-updated', sensor);
        }
      });

      ipc.on('/mqtt/action/unsubscribe', (event, arg) => {
        let sensor = this.sensors[arg];

        if (sensor == undefined) {
          fenix.send('/mqtt/error', 'sensor-not-found');
        }
        else if (sensor.subscribed) {
          sensor.subscribed = false;

          if (this.state.status != 'connected') {
            fenix.send('/mqtt/error', 'not-connected');
          }
          else {
            this.client.unsubscribe('/sensors/' + arg + '/#');
          }

          fenix.send('/mqtt/sensor-updated', sensor);
        }
      });

      resolve();
    });
  }

  setState(state) {
    this.state = merge(this.state, state);
    fenix.send('/mqtt/state', this.state);
  }

  connect(scheme, host) {
    if (host == undefined) {
      host = scheme;
      scheme = 'mqtt';
    }

    let uri = `${scheme}://${host}`;

    logger.info('connecting to', uri);

    this.setState({
      status: 'connecting',
      uri: {
        scheme: scheme,
        host: host
      }
    });

    return new Promise((resolve, reject) => {
      const todo = () => {
        this._client = mqtt.connect(uri);

        this._client.on('connect', () => {
          this._client.subscribe('/sensors/+');

          this.setState({
            status: 'connected',
            uri: {
              scheme: scheme,
              host: host
            }
          });

          Object.keys(this.sensors).forEach(k => {
            if (this.sensors[k].subscribed) {
              this.client.subscribe('/sensors/' + k + '/#');
            }
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

          // console.log(topic, message.toString());

          if (m != null) {
            let sensorName  = m[1]
              , sensor      = this.sensors[sensorName];

            if (sensor == undefined) {
              sensor = new MQTTSensor(sensorName);
              this.sensors[sensorName] = sensor;

              fenix.send('/mqtt/sensors', this.sensors);
            }

            if (m[2] == undefined) {
              //
              // Presence
              //

              sensor.updateLastPresence();
            }
            else {
              //
              // Data
              //

              let dataTypeName = m[2]
                , dataType     = sensor.getOrCreateType(dataTypeName);

              dataType.value = message.toString();

              fenix.send('/mqtt/sensor-updated', sensor);
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
