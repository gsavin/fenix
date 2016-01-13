'use strict';

const utils           = require('../utils')
    , should          = require('should')
    , SensorData      = require('../../lib/models/sensor-data.js')
    , SensorDataChunk = require('../../lib/models/sensor-data-chunk.js')
    , logger          = require('../../lib/logger.js');

describe('SensorData: models', function() {
  describe('#create()', function () {
    it('should create a new SensorData', function (done) {
      let now = new Date();
      
      let sd = {
        timestamp: now
      };

      SensorData.create(sd, function (err, createdData) {
        should.not.exist(err);

        done();
      });
    });
    
    it('should not create a new SensorData', function (done) {
      SensorData.create({}, function(err, createdData) {
        should.exist(err);
        done();
      });
    });
  });
});
