'use strict';

const config   = require('./lib/config')
    , logger   = require('./lib/logger.js')
    , path     = require('path')
    , db       = require('./lib/db.js')
    , fs       = require('fs');
    
  var dataPath = process.argv[2]
    , dataCS   = process.argv[3] ? process.argv[3] : "utf8";
  
  db.connect().then(function() {
    fs.access(dataPath, fs.R_OK, function(err) {
      if (err) {
        logger.error("File is not readable");
        process.exit(1);
      }
      
      fs.readFile(dataPath, dataCS, function(err, data) {
        if (err) {
          logger.error(err);
          process.exit(1);
        }
        
        let entries   = data.toString().split("\n")
          , sensorIDs = entries.shift().split("\t")
          , now       = Math.floor(Date.now() / 1000) * 1000;
          
        sensorIDs = sensorIDs.slice(1, sensorIDs.length - 1);
        
        logger.info(entries.length, "entries");
        logger.info("Sensors :", sensorIDs);
        
        while (entries.length > 0) {
          let entry = entries.shift()
            , data  = entry.split("\t")
            , time = new Date();
          
          if (entry.length == 0) {
            continue;
          }
          
          data.forEach(function(v, i) {
            data[i] = parseFloat(v.replace(",", "."));
          });
          
          time.setTime(now + Math.floor(data.shift() * 1000));
          
          logger.info("entry @", time);
        }
      });
    });
  }, function() {
    logger.error("Failed to connect to the database");
  });
