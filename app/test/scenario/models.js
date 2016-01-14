'use strict';

const utils           = require('../utils')
    , should          = require('should')
    , Scenario        = require('../../lib/models/scenario.js');

//
// Scenario Schema
//

describe('Scenario: models', function() {
  describe('#create()', function () {
    it('should create a new Scenario', function (done) {
      let s = {
        name: "test-scenario"
      };

      Scenario.create(s, function (err, createdData) {
        should.not.exist(err);
        should.exist(createdData);
        
        done();
      });
    });
    
    it('should not create a new Scenario (missing name)', function (done) {
      let s = {
        name: "test-scenario"
      };

      Scenario.create({}, function (err, createdData) {
        should.exist(err);
        done();
      });
    });
    
    it('should not create a new Scenario (existing name)', function (done) {
      let s = {
        name: "test-scenario"
      };

      Scenario.create(s, function (err, createdData) {
        should.not.exist(err);
        
        let s = {
          name: "test-scenario"
        };

        Scenario.create(s, function (err, createdData) {
          should.exist(err);
          done();
        });
      });
    });
  });
});
