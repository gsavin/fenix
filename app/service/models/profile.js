'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
  
var ProfileSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  
  algorithms: [String]
});

mongoose.model('Profile', ProfileSchema);
