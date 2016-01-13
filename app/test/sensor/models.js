'use strict';

const utils  = require('../utils')
    , should = require('should')
    , Sensor = require('../../lib/models/sensor.js');

describe('Sensor: models', function() {
  describe('#create()', function () {
    it('should create a new Sensor', function (done) {
      let s = {
        identifiant: "test-sensor"
      };

      Sensor.create(s, function (err, createdData) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should not create a new Sensor', function (done) {
      let s = {
        identifiant: "test-sensor"
      };

      Sensor.create(s, function (err, createdData) {
        Sensor.create(s, function (err, createdData) {
          should.exist(err);
          done();
        });
      });
    });
  });
});
