'use strict';

const mongoose  = require('mongoose')
    , Schema    = mongoose.Schema
    , SensorSet = require('./sensor-set.js');

var OperationPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  
  description: String,
  
  sensors: [SensorSet.schema],
  
  metadata: [{
   name: String,
   value: Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('OperationPlan', OperationPlanSchema);
