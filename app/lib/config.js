/**
 * @author Guilhelm Savin
 * @module config
 */
'use strict';

const os    = require('os')
    , path  = require('path')
    , fs    = require('fs');

var _ = require('lodash');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log("Fenix running on electron v" + process.versions.electron);
console.log('ENV is set to', process.env.NODE_ENV);

class FenixConfiguration {
  constructor() {
    this.config = {
      logger: {
        level: 'debug'
      }
    };
  }

  loadUserConfiguration() {
    try {
      let stat = fs.statSync(this.userConfigurationPath);

      if (stat.isFile()) {
        let content = fs.readFileSync(this.userConfigurationPath);
        this.config = JSON.parse(content);

        return true;
      }

      return false;
    }
    catch (err) {
      return false;
    }
  }

  saveUserConfiguration() {
    let configDir = path.dirname(this.userConfigurationPath);

    try {
      let stat = fs.statSync(configDir);

      if (!stat.isDirectory()) {
        throw `${configDir} is not a directory`;
      }
    }
    catch (err) {
      fs.mkdirSync(configDir);
    }

    try {
      fs.writeFileSync(this.userConfigurationPath, JSON.stringify(this.config, null, 2));
    }
    catch (err) {
      console.log("Unable to write configuration:", err);
    }
  }

  get userConfigurationPath() {
    return path.join(os.homedir(), '.fenix', 'config.json');
  }

  has(name) {
    let path  = name.split('.')
      , d     = this.config;

    for (let i = 0; i < path.length; i++) {
      if(!(d instanceof Object) || d[path[i]] == undefined) {
        return false;
      }

      d = d[path[i]];
    }

    return true;
  }

  get(name, defaultValue = null) {
    let path  = name.split('.')
      , d     = this.config;

    for (let i = 0; i < path.length - 1; i++) {
      d = d[path[i]] || {};
    }

    return d[path[path.length - 1]] || defaultValue;
  }

  set(name, value, save = false) {
    let path  = name.split('.')
      , d     = this.config;

    for (let i = 0; i < path.length - 1; i++) {
      if (!d[path[i]] || !( d[path[i]] instanceof Object)) {
        d[path[i]] = {};
      }

      d = d[path[i]];
    }

    d[path[path.length - 1]] = value;

    if (save) {
      this.saveUserConfiguration();
    }
  }

  configurationExists() {
    try {
      fs.statSync(this.userConfigurationPath);
      return true;
    }
    catch (err) {
      return false;
    }
  }
}

/*let config = new FenixConfiguration();
config.saveUserConfiguration();
console.log("Configuration : ", config.userConfigurationPath);
console.log("       Exists :", config.configurationExists());
console.log("         Load :", config.loadUserConfiguration());
*/
/**
 * Load environment configuration
 */
/*module.exports = _.merge(
    require('./all.js'),
    require('./' + process.env.NODE_ENV + '.js')
);*/

const cfg = new FenixConfiguration();
cfg.loadUserConfiguration();

module.exports = cfg;
