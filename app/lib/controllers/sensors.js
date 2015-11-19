'use strict';

var mongoose = require('mongoose')
  , Sensor   = mongoose.model('Sensor');

class SensorCtrl {
  constructor() {

  }

  /**
   * List of the sensors.
   *
   * This will return a promise, so it can be used in a synchronous or
   * asynchronous way. The `action` parameter is a callback called for each
   * sensor entry, with the mongoose object as a parameter.
   */
  list (action) {
    return new Promise(
      function (resolve, reject) {
        var stream = Sensor.find({}).stream()
          , errors = [];

        stream
        .on('data', function(sensor) {
          action(sensor);
        })
        .on('error', function(err) {
          errors.append(err);
        })
        .on('close', function() {
          if (errors.length > 0 ) {
            reject(errors);
          }
          else {
            resolve();
          }
        });
      }
    );
  }

  /**
   * Create a new sensor with the given id.
   *
   * If a sensor with this id already exists, it will be returned. Else, a new
   * one is created. This method returns a promise.
   *
   * Example of use :
   *
   * ```
   * sensor.createSensor(id)
   * .then(function(sensorObject) {
   *  ...
   * })
   * .catch(function(errors) {
   *  // error while creating the sensor
   * });
   * ```
   */
  create (id) {
    return new Promise(
      function (resolve, reject) {
        Sensor.findOne({identifiant: id}, function(err, sensor) {
          if (err) {
            reject(err);
          }
          else {
            if (sensor) {
              return resolve(sensor);
            }
            else {
              sensor = new Sensor({
                identifiant: id
              });

              sensor.save(function(err) {
                if (err) {
                  return reject(err);
                }

                resolve(sensor);
              });
            }
          }
        });
      }
    );
  }


  /**
   * Delete a sensor with the given id.
   *
   * If no sensor is found, will do nothing at all.
   *
   * ## Example
   *
   * ```
   * sensor.deleteSensor(id)
   * .then(function(sensorObject) {
   *  ...
   * })
   * .catch(function(errors) {
   *  // error while deleting the sensor
   * });
   * ```
   */
  delete (id) {
    return new Promise(
      function (resolve, reject) {
        Sensor.findOneAndRemove({identifiant: id}, function(err, sensor) {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        })
      });
  }
};

module.exports = new SensorCtrl();
