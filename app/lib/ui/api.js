'use strict';

const ipc = require('electron').ipcRenderer;

class FenixAPI {
  constructor() {

  }

  on(channel, cb) {
    ipc.on(channel, cb);
  }

  send(channel, ...args) {
    ipc.send(channel, ...args);
  }
}

module.exports = new FenixAPI();
