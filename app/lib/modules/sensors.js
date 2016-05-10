'use strict';

const EventEmitter = require('events');

class SensorModule extends EventEmitter {
  constructor() {
    /*
     * Do not forget to call the super constructor !
     * Otherwise, it will crash.
     */
    super();
  }

  init() {
    return new Promise((resolve, reject) => {
      const mongoose = require('mongoose')
          , Sensor   = mongoose.model('Sensor');

      this._controller = require('../controllers/sensor-ctrl.js');

      /*
       * Hook triggered when sensor's document is saved.
       * It means that a new sensor has been added, or an existing one has been
       * updated. Event is dispatched AFTER the update.
       */
      Sensor.schema.post('save', sensor => {
        this.emit('sensor-updated', sensor);
      });

      /*
       * Hook tirggered when a sensor's document is removed.
       * Event is dispatched BEFORE the removal.
       */
      Sensor.schema.pre('remove', sensor => {
        this.emit('sensor-removed', sensor);
      });

      resolve();
    });
  }

  get name() {
    return "sensors";
  }

  get priority() {
    return 10;
  }

  get controller() {
    return this._controller;
  }
};

module.exports = new SensorModule();
