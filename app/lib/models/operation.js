'use strict';

const mongoose = require('mongoose')
    , Schema   = mongoose.Schema
    , Scenario = require('./scenario.js');

var OperationSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  
  scenario: Scenario.schema
});

module.exports = mongoose.model('Operation', OperationSchema);
