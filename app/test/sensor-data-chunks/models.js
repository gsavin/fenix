'use strict';

const utils           = require('../utils')
    , should          = require('should')
    , SensorDataChunk = require('../../lib/models/sensor-data-chunk.js');

describe('SensorDataChunks: models', function() {
  describe('#computeResolutions()', function() {
    it('should generate resolutions from freq/div', function (done) {
      should.exist(SensorDataChunk.computeResolutions);

      let resolutions = SensorDataChunk.computeResolutions(5, [5, 4, 3, 2]);
      resolutions.should.eql([24000, 12000, 4000, 1000, 200]);

      done();
    });
  });
  
  describe('#create()', function () {
    it('should create a new SensorDataChunk', function (done) {
      let sdc = {
        resolutions: [1, 3, 3, 7]
      };

      SensorDataChunk.create(sdc, function (err, createdChunk) {
        should.not.exist(err);

        createdChunk.should.have.property('resolution');
        createdChunk.should.have.property('values')
        createdChunk.should.have.property('subchunks')
        createdChunk.should.have.property('resolutions').with.lengthOf(4);

        should(createdChunk.resolutions[0]).equal(1);
        should(createdChunk.resolutions[1]).equal(3);
        should(createdChunk.resolutions[2]).equal(3);
        should(createdChunk.resolutions[3]).equal(7);

        done();
      });
    });
  });
 
  describe('#createRoot()', function() {
    it('should create a root chunk', function(done) {
      let root = SensorDataChunk.createRoot(5, [5, 4, 3, 2]);
      should.exist(root);

      root.resolution.should.equal(24000);
      root.resolutions[1].should.equal(12000);
      root.resolutions[2].should.equal(4000);
      root.resolutions[3].should.equal(1000);
      root.resolutions[4].should.equal(200);

      done();
    });
  });
 
  describe('#getSubChunk()', function() {
    let root = SensorDataChunk.createRoot(5, [5]);

    it('should create and return a subchunk', function(done) {
      let sub = root.getSubChunk(1);
      should.exist(sub);
      sub.resolution.should.equal(200);

      done();
    });

    it('not-yet-get subchunk should not exist', function(done) {
      let sub = root.subchunks[0];
      should.not.exist(sub);

      done();
    });
  });
 
  describe('#isLeaf()', function() {
    let root = SensorDataChunk.createRoot(5, [5]);

    it('should be true', function(done) {
      root.getSubChunk(0).isLeaf().should.be.true();
      done();
    });

    it('should be false', function(done) {
      root.isLeaf().should.be.false();
      done();
    });
  });
  
  describe('#prepareSubChunks()', function() {
    function checkSubChunks(chunk, size, exp) {
      for (let i = 0; i < size; i++) {
        if (i < exp) {
          should.exist(chunk.subchunks[i]);
        }
        else {
          should.not.exist(chunk.subchunks[i]);
        }
      }
    }
    
    it('should create subchunks recursively', function(done) {
      let root = SensorDataChunk.createRoot(5, [5, 4]);
      
      root.prepareSubChunks(5000);
      
      checkSubChunks(root, 4, 2); {
        checkSubChunks(root.subchunks[0], 4, 4);
        checkSubChunks(root.subchunks[1], 4, 1);
      }
      
      done();
    });
  });
  
  describe('#putData()', function() {
    it('should put data at the good place', function(done) {
      let root = SensorDataChunk.createRoot(5, [5, 4]);
      root.putData(4900, 13.37);
      
      should.exist(root.subchunks[1]);
      should.exist(root.subchunks[1].subchunks[0]);
      
      root.subchunks[1].subchunks[0].values[4].should.equal(13.37);
      
      done();
    });
  });
});
