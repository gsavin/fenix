'use strict';

var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    register = function(tagName, element) {return document.registerElement(tagName, {prototype: element.prototype});};

var fenix = require('../fenix.js');

__extends(Sensor, HTMLElement);
__extends(SensorsList, HTMLElement);

function Sensor() {
  return Sensor.__super__.constructor.apply(this, arguments);
}

Sensor.prototype.init = function(model) {
  this.dataset.id = model._id;
  this.textContent = model.identifiant;
};

var SensorElement = register('fx-sensor', Sensor);

function SensorsList() {
  return SensorsList.__super__.constructor.apply(this, arguments);
}

SensorsList.prototype.ping = function() {
  console.log("pong");
};

SensorsList.prototype.createdCallback = function() {
  fenix.logger.info("sensors-list created");

  fenix.modules['sensors'].on('sensor-updated', sensor => {
    var sensorElement = this.querySelector(`[data-id='${sensors._id}']`);

    if (sensorElement) {
      sensorElement.init(sensor);
    }
    else {
      sensorElement = new SensorElement();
      sensorElement.init(sensor);

      this.appendChild(sensorElement);
    }
  });

  fenix.modules['sensors'].on('sensor-removed', sensor => {
    var sensorElement = this.querySelector(`[data-id='${sensors._id}']`);

    if (sensorElement) {
      this.removeChild(sensorElement);
    }
  });

  fenix.modules['sensors'].controller.list(sensor => {
    var sensorElement = new SensorElement();
    sensorElement.init(sensor);

    this.appendChild(sensorElement);
  })
  .then(function() {
    fenix.logger.debug("listing ends");
  })
  .catch(function(err) {
    fenix.logger.error("while listing sensors", err);
  });
};

SensorsList.prototype.attachedCallback = function() {
  fenix.logger.info("sensors-list attached");
};

SensorsList.prototype.detachedCallback = function() {
  fenix.logger.info("sensors-list detached");
};

SensorsList.prototype.attributeChangedCallback = function() {
  fenix.logger.info("sensors-list attribute changed");
};

module.exports = register('fx-sensors-list', SensorsList);
