'use strict';

const mongoose = require('mongoose')
    , Schema   = mongoose.Schema;

var SensorDataChunkModel = false;

var SensorDataChunkSchema = new Schema({
  resolution: {
    type: [Number],
    required: true
  },
  
  values: [Number],
  
  data: [{
    type: Schema.Types.ObjectId,
    ref:  'SensorDataChunk'
  }]
});

function handleSaveError(err) {
  console.log(err);
}

SensorDataChunkSchema.methods.putData = function(time, value) {
  if (this.resolution.length == 1) {
    if (time > this.resolution[0]) {
      // TODO
      console.log("time gt final resolution");
    }
    else {
      this.values[time] = value;
      this.save(handleSaveError);
    }
  }
  else {
    let i = Math.floor(time / this.resolution[0])
      , t = time - i * this.resolution[0]
      , d = this.data[i];
    
    if (!d) {
      d = new SensorDataChunkModel({
        resolution: this.resolution.slice(1)
      });
      
      d.save(handleSaveError);
      
      this.data[i] = d;
      this.save(handleSaveError);
    }
    
    d.putData(t, value);
  }
};

SensorDataChunkModel = mongoose.model('SensorDataChunk', SensorDataChunkSchema);
module.exports = SensorDataChunkModel;
