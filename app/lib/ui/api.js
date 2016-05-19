'use strict';

const ipc = require('electron').ipcRenderer;

class FenixAPI {
  constructor() {

  }

  on(channel, cb) {
    ipc.on(channel, cb);
  }

  removeListener(channel, cb) {
    ipc.removeListener(channel, cb);
  }

  send(channel, ...args) {
    ipc.send(channel, ...args);
  }

  get(channel, ...args) {
    return ipc.sendSync(channel, ...args);
  }
}

module.exports = new FenixAPI();
