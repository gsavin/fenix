'use strict';

var EventEmitter = require('events')
  , controller = require('../controllers/sensors.js');

class SensorModule extends EventEmitter {
  constructor() {
    /*
     * Do not forget to call the super constructor !
     * Otherwise, it will crash.
     */
    super();
  }

  init() {
    var mongoose = require('mongoose')
      , Sensor   = mongoose.model('Sensor');

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
  }

  get controller() {
    return controller;
  }
};

module.exports = new SensorModule();
