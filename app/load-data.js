'use strict';

const config   = require('./lib/config')
    , logger   = require('./lib/logger.js')
    , db       = require('./lib/db.js')
    , Sensor   = require('./lib/models/sensor.js')
    , path     = require('path')
    , fs       = require('fs');
    
var dataset = {
  path:     process.argv[2],
  charset:  process.argv[3] ? process.argv[3] : "utf8",
  speed:    10,
  timeBase: 1000
};

db.connect().then(function() {
  var reader = require('readline').createInterface({
    input: fs.createReadStream(dataset.path)
  });
  
  var timeOrigin = 0
    , lineno     = 0
    , sensorIDs  = false
    , sensors    = false;
  
  function readHeader(line) {
    if (!sensorIDs) {
      sensorIDs = line.split("\t");
      sensorIDs = sensorIDs.slice(1, sensorIDs.length - 1);
      sensors   = new Array(sensorIDs.length);
      
      logger.info("Sensors :");
      sensorIDs.forEach(function(sensorID, sensorIndex) {
        Sensor.findOne().where('identifiant').equals(sensorID).exec(function(err, sensor) {
          if (err) {
            logger.error(err);
            return;
          }
          
          if (sensor) {
            logger.info("sensor", sensorID, "found");
          }
          else {
            logger.info("can not find sensor", sensorID, ": it will be created");
            
            sensor = new Sensor({
              identifiant: sensorID
            });
            
            sensor.save(function(err) {
              if (err) {
                logger.error(err);
              }
            });
          }
          
          sensors[sensorIndex] = sensor;
        });
      });
      
      reader.close();
      
      process.nextTick(function() {
        reader = require('readline').createInterface({
          input: fs.createReadStream(dataset.path)
        });
        
        reader.on('line', readData);
        reader.on('close', function() {
          db.close(function() {
            process.exit(0);
          });
        });
      });
    }
  }
  
  function readData(line) {
    if (lineno == 0) {
      timeOrigin = Math.floor(Date.now() / dataset.timeBase) * dataset.timeBase;
    }
    
    lineno++;
    
    if (lineno < 2) {
      return;
    }
      
    let data = line.split("\t")
      , time = 0;
  
    if (data.length < 2) {
      logger.warn("invalid entry line#" + lineno);
      return;
    }
    
    data.forEach(function(v, i) {
      data[i] = parseFloat(v.replace(",", "."));
    });
    
    time = Math.floor(data.shift() * dataset.timeBase);
    
    function action() {
      let d = new Date();
      d.setTime(timeOrigin + time);
      
      let ms = time % 1000
        , s  = Math.floor(time / 1000) % 60
        , m  = Math.floor(time / 60000) % 60
        , h  = Math.floor(time / 3600000);
      
      logger.info("entry @", d, time, h, m, s, ms);
    }
    
    if (time / dataset.speed > Date.now() - timeOrigin) {
      reader.pause();
      
      setTimeout(function() {
        action();
        reader.resume();
      }, Math.max(1, time / dataset.speed + timeOrigin - Date.now()));
    }
    else {
      action();
    }
  }
  
  reader.on('line', readHeader);
}, function() {
  logger.error("Failed to connect to the database");
});
