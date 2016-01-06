'use strict';

const mongoose = require('mongoose')
    , Schema   = mongoose.Schema
    , Sensor   = require('./sensor.js');

var SensorSetSchema = new Schema({
  identifiant: {
      type:     String,
      unique:   true,
      required: true,
      index:    true
  },

  sensors: [Sensor.schema],

  metadata: [{
   name: String,
   value: Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('SensorSet', SensorSetSchema);
