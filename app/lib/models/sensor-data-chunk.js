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
  
  subchunks: [{
    type: Schema.Types.ObjectId,
    ref:  'SensorDataChunk'
  }]
});

function handleSaveError(err) {
  if (err) {
    console.log(err);
  }
}

/**
 * Compute resolutions of each sub-chunk according to an initial frequency
 * and subdivisions.
 *
 * Frequency is given as the number of values per second.
 *
 * Subdivisions define how many sub-chunks each chunk will contain. For
 * example, subdivisions[0] is the number of values at the final chunk
 * depth. subdivisions[1] is the number of sub-chunk in chunks at depth-1.
 *
 * Example :
 *
 * We have a 5Hz series, so we will have a value every 200ms. We would like three
 * chunk levels. The last one will contain 4 sub-chunks, the previous 3, and
 * sub-chunk in the root will contain 2 sub-chunks. So we have the following
 * subdivisions : [4, 3, 2], with a 5Hz frequency. Resolutions will be :
 * [4800, 2400, 800, 200]
 *
 * @param freq          amount of values per second
 * @param subdivisions  divisions in chunk for each level, starting with the
 *                      deepest one
 */
function computeResolutions(freq, subdivisions) {
  let resolutions = [];
  resolutions.push(Math.floor(1000 / freq));
  
  for (let i = 0; i < subdivisions.length; i++) {
    resolutions.push(resolutions[i] * subdivisions[i]);
  }
  
  return resolutions.reverse();
}

SensorDataChunkSchema.statics.computeResolutions = computeResolutions;

SensorDataChunkSchema.statics.createRoot = function(freq, subdivisions) {
  let resolutions = computeResolutions(freq, subdivisions);
  
  return new SensorDataChunkModel({
    resolution: resolutions
  });
};

SensorDataChunkSchema.methods.getSubChunk = function(idx) {
  let sub = this.subchunks[idx];
  
  // TODO
};

SensorDataChunkSchema.methods.prepareSubChunks = function(maxTime) {
  let i = 0;
  
  while (maxTime > 0) {
    let sub = this.subchunks[i];
    
    if (!sub) {
      this.subchunks[i] = sub = new
    }
  }
};

SensorDataChunkSchema.methods.putData = function(time, value) {
  if (this.resolution.length == 1) {
    time = Math.floor(time / this.resolution[0]);
    
    this.values[time] = value;
    this.save(handleSaveError);
  }
  else {
    let i = Math.floor(time / this.resolution[0])
      , t = time - i * this.resolution[0]
      , d = this.subchunks[i];
    
    if (!d) {
      d = new SensorDataChunkModel({
        resolution: this.resolution.slice(1)
      });
      
      d.save(handleSaveError);
      
      this.subchunks[i] = d;
      this.save(handleSaveError);
    }
    
    d.putData(t, value);
  }
};

SensorDataChunkModel = mongoose.model('SensorDataChunk', SensorDataChunkSchema);
module.exports = SensorDataChunkModel;
