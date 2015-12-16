'use strict';

const config   = require('./lib/config')
    , mongoose = require('mongoose')
    , winston  = require('winston')
    , path     = require('path')
    , fs       = require('fs')
    , uuid     = require('uuid');

var logger = new (winston.Logger)({
  level: 'debug',
  transports: [
    new (winston.transports.Console)(),
  ]
});

mongoose.connect(config.db.DB_URI, config.db.DB_OPTIONS);

var db = mongoose.connection;

db.on('error', err => {
  logger.error("db:", err);
  reject(err);
});

db.once('connected', () => {
  var modelsPath = path.join(__dirname, 'lib', 'models');

  fs.readdirSync(modelsPath).forEach(file => {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
      require(path.join(modelsPath, file));
      logger.info("model \"" + path.join(modelsPath, file) + "\" loaded");
    }
  });

  var sensor_uuid = uuid.v4();
  logger.info("sensor id:", sensor_uuid);

  var Sensor = mongoose.model('Sensor')
    , SensorData = mongoose.model('SensorData')
    , sensor = new Sensor({identifiant: sensor_uuid})
    , now = Date.now();

  sensor.save().then(function() {
    logger.info("Sensor saved");

    function randomArray() {
      let data = [];

      for (let i = 0; i < 1000; i++) {
        data.push(Math.random());
      }

      return data;
    }

    var sensorDatas = [];

    for (let min = 0; min < 60; min++) {
      for (let s = 0; s < 60; s++) {
        var d = new Date(now + min * 60000 + s * 1000)
          , sensorData = new SensorData({timestamp: d, data: randomArray()});

        sensorData.save();
        sensorDatas.push(sensorData);
      }
    }

    sensor.data = sensorDatas;
    sensor.save(function() {logger.info("all done");});
  });
});
