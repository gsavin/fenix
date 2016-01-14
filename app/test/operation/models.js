'use strict';

const utils     = require('../utils')
    , should    = require('should')
    , Operation = require('../../lib/models/operation.js');

//
// Operation Schema
//

describe('Operation: models', function() {
  describe('#create()', function () {
    it('should create a new Operation', function (done) {
      Operation.create({}, function (err, createdData) {
        should.not.exist(err);
        should.exist(createdData);
        
        done();
      });
    });
  });
});
