'use strict';

const ipc = require('ipc');

class FenixAPI {
  constructor() {

  }

  on(channel, cb) {
    ipc.on(channel, cb);
  }

  send(channel, args) {
    ipc.send(channel, args);
  }
}

module.exports = new FenixAPI();
