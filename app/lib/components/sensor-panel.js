'use strict';

function _register(tagName, proto) {
  return document.registerElement(tagName, {prototype: proto});
}

var fenix   = require('../fenix.js')
  , sensors = fenix.modules['sensors'];

var SensorPanelPrototype = Object.create(HTMLElement.prototype);

SensorPanelPrototype.loadSensor = function(sensor) {
  this._fx_sensor = sensor;

  this._fx_shadow_root.querySelector('.sensor-identifiant').textContent = sensor.identifiant;
  this._fx_shadow_root.querySelector('.sensor-id').textContent = sensor._id;
};

SensorPanelPrototype.createdCallback = function() {
  this._fx_shadow_root = this.createShadowRoot();
  fenix.setTemplate(this._fx_shadow_root, "sensor-panel");
};

SensorPanelPrototype.attachedCallback = function() {
};

SensorPanelPrototype.detachedCallback = function() {
};

SensorPanelPrototype.attributeChangedCallback = function(attrName, oldVal, newVal) {
  if (attrName == "data-sensor-id" || attrName == "sensor-id") {
    fenix.logger.debug("set panel sensor-id to:", newVal);

    sensors.controller.get(newVal).then(
      sensor => {
        this.loadSensor(sensor);
      }
    );
  }
};

module.exports = _register('fx-sensor-panel', SensorPanelPrototype);
