'use strict';

process.env.NODE_ENV = 'test';

const config   = require('../lib/config.js')
    , mongoose = require('mongoose');

beforeEach(function (done) {
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    
    return done();
  }


  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.DB_URI, function (err) {
      if (err) {
        throw err;
      }
      
      return clearDB();
    });
  } else {
    return clearDB();
  }
});


afterEach(function (done) {
  mongoose.disconnect();
  return done();
});
