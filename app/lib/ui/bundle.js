/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	(function () {
	  var fenix = __webpack_require__(1);

	  /*
	   * Initializing the base tag...
	   */

	  var base = document.createElement("base");
	  base.setAttribute("href", "//" + __dirname + "/");
	  document.head.appendChild(base);

	  fenix.logger.debug("init fenix");
	  fenix.init().then(function () {
	    fenix.logger.debug("init ok");
	  }, function (err) {
	    fenix.logger.debug("init failed", err);
	  }).catch(function (err) {
	    fenix.logger.error(err);
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var logger = __webpack_require__(2),
	    fenixAPI = __webpack_require__(12);

	var React = __webpack_require__(14);
	var reactDOM = __webpack_require__(15);

	var COMPONENTS = [
	//  'sensors-list',
	//  'sensor-panel',
	'mqtt-connection-manager', 'mqtt-sensors-list'];

	var FenixUI = function () {
	  function FenixUI() {
	    _classCallCheck(this, FenixUI);
	  }

	  _createClass(FenixUI, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        _this.loadComponents().catch(function (err) {
	          logger.error(err);reject();
	        })
	        //.then(() => { return this.loadAngular(); }, reject)
	        .then(resolve, reject).catch(function (err) {
	          logger.error(err);reject();
	        });
	      });
	    }
	  }, {
	    key: 'loadComponents',
	    value: function loadComponents() {
	      return new Promise(function (resolve, reject) {
	        logger.info('loading components');

	        /*COMPONENTS.forEach(name => {
	          try {
	            require(`./components/${name}.js`);
	            logger.debug(`components "./components/${name}.js" loaded`);
	          }
	          catch(err) {
	            logger.error(`failed to load "./components/${name}.js"`, err);
	          }
	        });*/

	        var MQTTConnectionManager = __webpack_require__(16),
	            MQTTSensorsList = __webpack_require__(17);

	        reactDOM.render(React.createElement(MQTTConnectionManager, null), document.getElementById('mqtt-connection-manager'));

	        reactDOM.render(React.createElement(MQTTSensorsList, null), document.getElementById('mqtt-sensors-list'));

	        resolve();
	      });
	    }
	  }, {
	    key: 'logger',
	    get: function get() {
	      return logger;
	    }
	  }, {
	    key: 'api',
	    get: function get() {
	      return fenixAPI;
	    }
	  }]);

	  return FenixUI;
	}();

	module.exports = new FenixUI();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(3),
	    winston = __webpack_require__(11);

	module.exports = new winston.Logger({
	  level: config.logger.level,
	  transports: [new winston.transports.Console()]
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author Guilhelm Savin
	 * @module config
	 */
	'use strict';

	var _ = __webpack_require__(4);
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	console.log('env is set to', process.env.NODE_ENV);

	/**
	 * Load environment configuration
	 */
	module.exports = _.merge(__webpack_require__(5), __webpack_require__(7)("./" + process.env.NODE_ENV + '.js'));

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var path = __webpack_require__(6),
	    rootPath = path.normalize(__dirname + '/../..');

	module.exports = {
	  ROOT_PATH: rootPath,

	  SERVER_IP: '0.0.0.0',
	  SERVER_PORT: process.env.PORT || 8000,

	  SESSION_SECRET: '1b53bf3bb05e113e75b8',

	  logger: {
	    level: 'info'
	  },

	  db: {
	    options: {
	      db: {
	        safe: true
	      }
	    }
	  },

	  STATIC_ROUTES: {
	    '/scripts': 'app/scripts',
	    '/css': 'app/styles',
	    '/img': 'app/images',
	    '/fonts': 'app/fonts',

	    '/favicon.ico': 'app/favicon.ico',
	    '/favicon.png': 'app/favicon.png'
	  },

	  mqtt: {
	    uri: 'mqtt://192.168.1.243'
	  },

	  IO_PATH: "/api/io/"
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./all.js": 5,
		"./development.js": 8,
		"./index.js": 3,
		"./production.js": 9,
		"./test.js": 10
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  ENV: 'development',

	  SSL_ON: true,
	  SSL_PRIVATE_KEY: 'ssl/firediag.key',
	  SSL_CERTIFICATE: 'ssl/firediag.crt',

	  CHECK_ADMIN_ACCOUNT: true,

	  logger: {
	    level: 'debug'
	  },

	  db: {
	    uri: 'mongodb://localhost/firediag-development',
	    name: 'firediag-development'
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  ENV: 'production',

	  SSL_ON: true,
	  SSL_PRIVATE_KEY: 'ssl/firediag.key',
	  SSL_CERTIFICATE: 'ssl/firediag.crt',

	  logger: {
	    level: 'error'
	  },

	  db: {
	    uri: 'mongodb://localhost/firediag-production',
	    name: 'firediag-production'
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  ENV: 'test',

	  SSL_ON: true,
	  SSL_PRIVATE_KEY: 'ssl/firediag.key',
	  SSL_CERTIFICATE: 'ssl/firediag.crt',

	  CHECK_ADMIN_ACCOUNT: true,

	  logger: {
	    level: 'info'
	  },

	  db: {
	    uri: 'mongodb://localhost/firediag-test',
	    name: 'firediag-test'
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ipc = __webpack_require__(13);

	var FenixAPI = function () {
	  function FenixAPI() {
	    _classCallCheck(this, FenixAPI);
	  }

	  _createClass(FenixAPI, [{
	    key: 'on',
	    value: function on(channel, cb) {
	      ipc.on(channel, cb);
	    }
	  }, {
	    key: 'send',
	    value: function send(channel, args) {
	      ipc.send(channel, args);
	    }
	  }]);

	  return FenixAPI;
	}();

	module.exports = new FenixAPI();

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("ipc");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(14),
	    fenix = __webpack_require__(1);

	var MQTTConnectionManager = function (_React$Component) {
	  _inherits(MQTTConnectionManager, _React$Component);

	  function MQTTConnectionManager(props) {
	    _classCallCheck(this, MQTTConnectionManager);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTConnectionManager).call(this, props));

	    _this.state = {
	      status: 'disconnected',
	      uri: '',
	      error: null
	    };

	    fenix.api.on('/mqtt/state', function (state) {
	      _this.setState(state);
	    });
	    return _this;
	  }

	  _createClass(MQTTConnectionManager, [{
	    key: 'doConnect',
	    value: function doConnect() {
	      fenix.api.send('/mqtt/action/connect', this.refs.mqttServerURI.value);
	    }
	  }, {
	    key: 'doDisconnect',
	    value: function doDisconnect() {
	      fenix.api.send('/mqtt/action/disconnect');
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(event) {
	      if (this.state.status != 'connected' && this.state.status != 'connecting') this.setState({ uri: event.target.value });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var action = null,
	          icon = 'fa-plug';

	      if (this.state.status == 'connected') {
	        action = this.doDisconnect.bind(this);
	        icon = "fa-ban";
	      } else {
	        action = this.doConnect.bind(this);

	        if (this.state.status == 'connecting') {
	          icon = "fa-spin fa-cog";
	        }
	      }

	      return React.createElement(
	        'div',
	        { className: "mqtt-connection-manager " + this.state.status },
	        React.createElement('input', {
	          type: 'text',
	          ref: 'mqttServerURI',
	          value: this.state.uri,
	          name: 'mqtt-server-uri',
	          placeholder: 'Enter mqtt server uri...',
	          onChange: this.handleChange.bind(this) }),
	        React.createElement(
	          'button',
	          { className: 'action', onClick: action },
	          React.createElement('i', { className: "fa fa-fw " + icon })
	        )
	      );
	    }
	  }]);

	  return MQTTConnectionManager;
	}(React.Component);

	module.exports = MQTTConnectionManager;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(14),
	    fenix = __webpack_require__(1);

	var MQTTSensorsList = function (_React$Component) {
	  _inherits(MQTTSensorsList, _React$Component);

	  function MQTTSensorsList(props) {
	    _classCallCheck(this, MQTTSensorsList);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTSensorsList).call(this, props));

	    _this.state = {
	      sensors: {}
	    };

	    fenix.api.on('/mqtt/sensors', function (sensors) {
	      _this.setState({
	        sensors: sensors
	      });
	    });
	    return _this;
	  }

	  _createClass(MQTTSensorsList, [{
	    key: 'render',
	    value: function render() {
	      var sensors = [];

	      Object.keys(this.state.sensors).forEach(function (k) {
	        sensors.push(React.createElement(
	          'li',
	          null,
	          k
	        ));
	      });

	      return React.createElement(
	        'ul',
	        null,
	        sensors
	      );
	    }
	  }]);

	  return MQTTSensorsList;
	}(React.Component);

	module.exports = MQTTSensorsList;

/***/ }
/******/ ]);