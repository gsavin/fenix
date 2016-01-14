'use strict';

const should     = require('should')
    , sinon      = require('sinon')
    , Sensor     = require('../../lib/models/sensor.js')
    , SensorCtrl = require('../../lib/controllers/sensor-ctrl.js');

require('should-sinon');
    
describe('SensorCtrl:', function() {
  describe('#create()', function() {
    it('should return a Promise', function(done) {
      let p = SensorCtrl.create('sensor-test');
      should.exist(p);
      p.should.be.an.instanceof(Promise);
      
      done();
    });
    
    it('should create a new sensor', function(done) {
      let p = SensorCtrl.create('sensor-test');
        
      p.catch(function() {
        should.fail();
        done();
      }).then(function(sensor) {
        done();
      });
    });
    
    it('should fail', function(done) {
      Sensor.create({identifiant:'sensor-test'}, function(err, sensor) {
        should.not.exist(err);
        should.exist(sensor);
        
        let p = SensorCtrl.create('sensor-test');
          
        p.catch(function() {
          console.log("caatch");
          done();
        }).then(function(sensor) {
          // TODO
          done();
        });
      });
    });
  });
});
