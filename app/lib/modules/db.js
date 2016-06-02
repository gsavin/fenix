'use strict';

const mongoose      = require('mongoose')
    , EventEmitter  = require('events')
    , path          = require('path')
    , fs            = require('fs')
    , merge         = require('lodash').merge
    , ipc           = require('electron').ipcMain
    , config        = require('../config')
    , logger        = require('../logger')
    , fenix         = require('../fenix');

class DBModule {
  constructor() {
    this.state = {
      status: 'disconnected',
      uri: {
        host: '',
        scheme: 'mongodb',
        database: ''
      }
    };

    this.connectionCount = 0;
  }

  init() {
    return new Promise((resolve, reject) => {
      ipc.on('/db/state/get', (event) => {
          event.returnValue = this.state;
      });

      ipc.on('/db/servers/add', (event, name, server) => {
        fenix.config.set(`db.servers.${name}`, server, true);
        fenix.send('/db/servers', fenix.config.get('db.servers'));
      });

      ipc.on('/db/servers/get', (event) => {
        event.returnValue = fenix.config.get('db.servers', {});
      });

      ipc.on('/db/action/connect', (event, server) => {
        this.connect(server);
      });

      resolve();
    });
  }

  get name() {
    return "db";
  }

  get priority() {
    return 0;
  }

  setState(state) {
    this.state = merge(this.state, state);
    fenix.send('/db/state', this.state);
  }

  connect(server, options = null) {
    let dbOptions = config.get('db.defaultOptions', {});

    let uri = `${server.scheme}://${server.host}/${server.database}`;

    if (this.db) {
      this.db.close();
      this.db.removeAllListeners();
      this.db = null;
    }

    this.setState({
      status: 'connecting',
      uri: server
    });

    if (options != null) {
      dbOptions = merge(dbOptions, options);
    }

    let t = this.connectionCount++;

    console.log("Connecting to", uri, t);
    /*mongoose.connect(uri, dbOptions, err => {
      console.log("completed", err);
    });

    this.db = mongoose.connection;*/
    this.db = mongoose.createConnection();
    this.db.open(uri, dbOptions);

    this.db.on('error', err => {
      fenix.send('/error', {
        from: 'db',
        title: 'Database Error',
        message: err
      });
    });

    this.db.once('connected', () => {
      logger.debug("db connected", t);

      this.loadModels();

      this.setState({
        status: 'connected',
        uri: server
      });
    });

    this.db.on('disconnected', () => {
      this.setState({
        status: 'disconnected'
      });
    });

    //
    // FIX
    // Without this, first call to connect just blocks. Should find where this
    // error comes from...
    //
    setTimeout(() => {}, 250);
  }

  disconnect() {
    if (this.db) {
      this.db.close(() => {
        this.db.removeAllListeners();
        this.db = null;
      });
    }
  }

  loadModels() {
    var modelsPath = path.join(__dirname, '..', 'models');

    fs.readdirSync(modelsPath).forEach(file => {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(path.join(modelsPath, file));
        logger.info("model \"" + path.join(modelsPath, file) + "\" loaded");
      }
    });
  }
}

module.exports = new DBModule();
