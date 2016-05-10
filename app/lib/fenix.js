'use strict';

var config   = require('./config')
  , fs       = require('fs')
  , path     = require('path')
  , mongoose = require('mongoose')
  , BrowserWindow = require('browser-window')
  , logger   = require('./logger.js');

const MODULES = [
//  'sensors',
  'mqtt',
//  'view-utils'
];

/*function initFenixApp(fenix) {
  return function(resolve, reject) {
    fenix.logger.debug("start initialize fenix");

    if (fenix.loaded) {
      //
      // Already loaded...
      //
      fenix.logger.debug("already loaded");
      resolve();
    }

    fenix.loaded = true;

    //
    // Loading modules...
    //

    loadModules(fenix)
      .then(resolve, reject);
  };
}

function loadModules(fenix) {
  return new Promise((resolve, reject) => {
    fenix.logger.info('loading modules');

    var mods = [];

    MODULES.forEach(name => {
      try {
        let mod = require(`./modules/${name}.js`);
        fenix.modules[name] = mod;

        if (name != mod.name) {
          fenix.logger.debug(`Module ${mod.name} should be in file 'modules/${mod.name}.js'`);
        }

        mods.push(mod);
        //mod.init();

        fenix.logger.debug(`module "./modules/${name}.js" loaded`);
      }
      catch(err) {
        fenix.logger.error(`failed to load "./modules/${name}.js"`, err);
      }
    });

    mods.sort(function (m1, m2) {
      return m2.priority - m1.priority;
    });

    var f = () => {
      if (mods.length == 0) {
        resolve();
      }
      else {
        var m = mods.pop();

        fenix.logger.info("init " + m.name);

        m.init().then(f, reject).catch(reject);
      }
    };

    f();
  })
}*/

class FenixApp {
  constructor() {
    this.config = config;
    this.loaded = false;
    this.modules = {};

    this._logger = logger;
  }

  get logger() {
    return this._logger;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.logger.debug("start initialize fenix");

      if (this.loaded) {
        //
        // Already loaded...
        //
        this.logger.debug("already loaded");
        resolve();
      }

      /*
       * Loading modules...
       */

      this.loadModules()
          .catch(err => { logger.error(err); reject(); })
        .then(() => { this.loadWindow(); }, reject)
          .catch(err => { logger.error(err); reject(); })
        .then(() => { this.loaded = true; }, reject)
          .catch(err => { logger.error(err); reject(); })
        .then(resolve, reject)
          .catch(err => { logger.error(err); reject(); });
    });
  }

  loadModules() {
    return new Promise((resolve, reject) => {
      if (this.loaded) {
        resolve();
        return;
      }

      this.logger.info('loading modules');

      var mods = [];

      MODULES.forEach(name => {
        try {
          let mod = require(`./modules/${name}.js`);
          this.modules[name] = mod;

          if (name != mod.name) {
            this.logger.debug(`Module ${mod.name} should be in file 'modules/${mod.name}.js'`);
          }

          mods.push(mod);
          //mod.init();

          this.logger.debug(`module "./modules/${name}.js" loaded`);
        }
        catch(err) {
          this.logger.error(`failed to load "./modules/${name}.js"`, err);
        }
      });

      mods.sort(function (m1, m2) {
        return m2.priority - m1.priority;
      });

      var f = () => {
        if (mods.length == 0) {
          resolve();
        }
        else {
          var m = mods.pop();

          this.logger.info("init " + m.name);

          m.init().then(f, reject).catch(reject);
        }
      };

      f();
    })
  }

  loadWindow() {
    const menu = require('./controllers/menu.js');

    this.mainWindow = new BrowserWindow({
      width: 1280,
      height: 720
    });

    this.mainWindow.loadUrl('file://' + __dirname + '/../default.html');
    this.mainWindow.setMenu(menu);

    this.mainWindow.on('closed', () => {
      //
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      //
      this.mainWindow = null;
    });
  }

  send(channel, arg) {
    if (this.mainWindow != undefined) {
      this.mainWindow.webContents.send(channel, arg);
    }
  }

/*  setTemplate (element, templateName) {
    var template = document.querySelector('#template-' + templateName)
      , clone    = document.importNode(template.content, true);

    element.appendChild(clone);
  }*/
}

module.exports = new FenixApp();
