'use strict';

var angular = require('angular');

function sensorsListFactory(fenix) {
  var sensors = {};

  fenix.modules['sensors'].on('sensor-updated', function(sensor) {
    if (sensors[sensor._id]) {
      sensors[sensor._id].name = sensor.identifiant;
    }
    else {
      sensors[sensor._id] = {name: sensor.identifiant};
    }
  });

  fenix.modules['sensors'].on('sensor-removed', function(sensor) {
    if (sensors[sensor._id]) {
      delete sensors[sensor._id];
    }
  });

  fenix.modules['sensors'].controller.list(function(sensor) {
    sensors[sensor._id] = {name: sensor.identifiant};
  });

  function link(scope, element, attr) {
    scope.sensors = sensors;
  }

  return {
    template: '<ul><li ng-repeat="(id, s) in sensors">{{ s.name }}</li></ul>',
    link: link
  };
}

angular.module('fenix')
  .directive('sensorsList', ['fenix', sensorsListFactory]);
