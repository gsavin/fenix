'use strict';

const mongoose  = require('mongoose')
    , Schema    = mongoose.Schema
    , SensorSet = require('./sensor-set.js');

var ScenarioSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  
  description: String,
  
  sensors: [SensorSet.schema],
  
  location: {
    type: [Number],
    index: '2d'
  },
  
  metadata: [{
   name: String,
   value: Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('Scenario', ScenarioSchema);
