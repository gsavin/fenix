'use strict';

function _register(tagName, proto) {
  return document.registerElement(tagName, {prototype: proto});
}

var fenix = require('../fenix-ui.js');

var SensorPrototype      = Object.create(HTMLElement.prototype)
  , SensorsListPrototype = Object.create(HTMLElement.prototype);

SensorPrototype.init = function(model) {
  this.dataset.id = model._id;
  this.innerHTML = '<i class="fa fa-dot-circle-o"></i>' + model.identifiant;
};

SensorPrototype.createdCallback = function() {
  this.addEventListener('click', e => {
    e.preventDefault();
    fenix.logger.debug("click on:", this.dataset.id);

    var sensorPanel = document.querySelector("fx-sensor-panel");
    sensorPanel.dataset.sensorId = this.dataset.id;
  });
};

var SensorElement = _register('fx-sensor', SensorPrototype);

SensorsListPrototype.ping = function() {
  console.log("pong");
};

SensorsListPrototype.createdCallback = function() {
  fenix.logger.info("sensors-list created");

  fenix.modules['sensors'].on('sensor-updated', sensor => {
    fenix.logger.info("sensor-updated");

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
    fenix.logger.info("sensor-removed");

    var sensorElement = this.querySelector(`[data-id='${sensors._id}']`);

    if (sensorElement) {
      this.removeChild(sensorElement);
    }
  });

  fenix.modules['sensors'].controller.list(sensors => {
    sensors.forEach(sensor => {
      var sensorElement = new SensorElement();
      sensorElement.init(sensor);

      this.appendChild(sensorElement);
    });
  });
};

SensorsListPrototype.attachedCallback = function() {
  fenix.logger.info("sensors-list attached");
};

SensorsListPrototype.detachedCallback = function() {
  fenix.logger.info("sensors-list detached");
};

SensorsListPrototype.attributeChangedCallback = function(attrName, oldVal, newVal) {
  fenix.logger.info("sensors-list attribute " + attrName + " changed to", newVal);
};

module.exports = _register('fx-sensors-list', SensorsListPrototype);
