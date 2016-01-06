'use strict';

const mongoose      = require('mongoose')
    , Schema        = mongoose.Schema
    , OperationPlan = require('./operation-plan.js');

var OperationSchema = new Schema({
  plan: OperationPlan.schema
});

module.exports = mongoose.model('Operation', OperationSchema);
