'use strict';

const mongoose = require('mongoose')
    , Schema   = mongoose.Schema;

var SensorDataChunkModel = false;

/**
 * SensorDataChunk are documents storing data values.
 *
 * Transactions with the database have a cost, and we try to reduce them. Storing
 * all data in a single document implies to update a large amount of data. So, we
 * divide each chunk into subchunks recursively according to a given subdivisions
 * pattern. When putting data into the root chunk, we find the subchunk corresponding
 * to the timestamp and put the data inside, so we just have to update this subdocument.
 *
 * Subdivisions pattern is composed of a frequency (it will be the number of values
 * per second) and the number of subdivisions for each level of chunks.
 *
 * For example, we consider a frequency of 5Hz and we want 2 levels of chunks,
 * with 5-subdivisions, and 4-subdivisions. The root chunk will contain as subchunks
 * as necessary. Then subchunks at root+1 level will contain 4 subchunks, and
 * subchunks at root+2 level will contain 5 subchunks.
 * 
 */
var SensorDataChunkSchema = new Schema({
  resolutions: {
    type: [Number],
    required: true
  },
  
  values: [Number],
  
  subchunks: [{
    type: Schema.Types.ObjectId,
    ref:  'SensorDataChunk'
  }]
});

SensorDataChunkSchema.virtual('resolution').get(function() {
  return this.resolutions[0];
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
    resolutions: resolutions
  });
};

SensorDataChunkSchema.methods.getSubChunk = function(idx) {
  let sub = this.subchunks[idx];
  
  if (!sub) {
    this.subchunks[idx] = sub = new SensorDataChunkModel({
      resolutions: this.resolutions.slice(1)
    });
    
    sub.save(handleSaveError);
  }
  
  return sub;
};

SensorDataChunkSchema.methods.isLeaf = function() {
  return this.resolutions.length == 1;
};

SensorDataChunkSchema.methods.prepareSubChunks = function(maxTime) {
  let i = 0;
  
  if (!this.isLeaf()) {
    while (maxTime > 0) {
      let sub = this.getSubChunk(i++);
      sub.prepareSubChunks(Math.min(maxTime, this.resolution));
      
      maxTime -= this.resolution;
    }
  }
};

SensorDataChunkSchema.methods.putData = function(time, value) {
  if (this.resolutions.length == 1) {
    time = Math.floor(time / this.resolution);
    
    this.values[time] = value;
    this.save(handleSaveError);
  }
  else {
    let i = Math.floor(time / this.resolution)
      , t = time - i * this.resolution
      , d = this.subchunks[i];
    
    if (!d) {
      d = new SensorDataChunkModel({
        resolutions: this.resolutions.slice(1)
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
