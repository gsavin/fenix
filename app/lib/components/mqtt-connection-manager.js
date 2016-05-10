'use strict';

const utils = require('./utils')
    , util  = require('util')
    , fenix = require('../fenix-ui')
    , ipc = require('ipc');

class MQTTConnectionManagerElement extends HTMLElement {

  constructor() {
    HTMLElement.call(this);
  }

  createdCallback() {
    this._fx_shadow_root = this.createShadowRoot();
    utils.setTemplate(this._fx_shadow_root, "mqtt-connection-manager");
  }

  setStatus(status) {
    let uri = this._fx_shadow_root.querySelector('input[name="mqtt-server-uri"]');

    console.log('set status', status);

    this.classList.remove('connecting');
    this.classList.remove('error');
    this.classList.remove('connected');
    this.classList.remove('disconnected');

    this.classList.add(status);

    if (status === 'connected') {
      uri.setAttribute('readonly', 'readonly');
    }
    else {
      uri.removeAttribute('readonly');
    }
  }

  attachedCallback() {
    ipc.on('/mqtt/status', status => {
      this.setStatus(status);
    });

    let actionConnect     = this._fx_shadow_root.querySelector('.action-connect')
      , actionDisconnect  = this._fx_shadow_root.querySelector('.action-disconnect')
      , uri               = this._fx_shadow_root.querySelector('input[name="mqtt-server-uri"]');

    actionConnect.addEventListener('click', e => {
      ipc.send('/mqtt/connect', uri.value);
    });
  }

  detachedCallback() {
    ipc.removeListener('status', MQTTConnectionManagerElement.prototype.setStatus);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {

  }
}

module.exports = utils.register('fx-mqtt-connection-manager', MQTTConnectionManagerElement.prototype);
