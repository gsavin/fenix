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

	var menu = __webpack_require__(1);

	(function () {
	  var fenix = __webpack_require__(4);

	  window.addEventListener('contextmenu', function (e) {
	    e.preventDefault();
	    menu.popup(remote.getCurrentWindow());
	  }, false);

	  /*
	   * Initializing the base tag...
	   */

	  var base = document.createElement("base");
	  base.setAttribute("href", "//" + __dirname + "/");
	  document.head.appendChild(base);

	  fenix.logger.debug("init fenix");
	  fenix.init();
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Menu = __webpack_require__(2).remote.Menu;

	var template = [{
	  label: 'File',
	  submenu: [{
	    label: 'Exit',
	    accelerator: 'CmdOrCtrl+Q',
	    click: function click(item, focusedWindow) {
	      console.log('User wanna exit now');
	    }
	  }]
	}, {
	  label: 'Edit',
	  submenu: [{
	    label: 'Undo',
	    accelerator: 'CmdOrCtrl+Z',
	    role: 'undo'
	  }, {
	    label: 'Redo',
	    accelerator: 'Shift+CmdOrCtrl+Z',
	    role: 'redo'
	  }, {
	    type: 'separator'
	  }, {
	    label: 'Cut',
	    accelerator: 'CmdOrCtrl+X',
	    role: 'cut'
	  }, {
	    label: 'Copy',
	    accelerator: 'CmdOrCtrl+C',
	    role: 'copy'
	  }, {
	    label: 'Paste',
	    accelerator: 'CmdOrCtrl+V',
	    role: 'paste'
	  }, {
	    label: 'Select All',
	    accelerator: 'CmdOrCtrl+A',
	    role: 'selectall'
	  }]
	}, {
	  label: 'View',
	  submenu: [{
	    label: 'Reload',
	    accelerator: 'CmdOrCtrl+R',
	    click: function click(item, focusedWindow) {
	      if (focusedWindow) focusedWindow.reload();
	    }
	  }, {
	    label: 'Toggle Full Screen',
	    accelerator: function () {
	      if (process.platform == 'darwin') return 'Ctrl+Command+F';else return 'F11';
	    }(),
	    click: function click(item, focusedWindow) {
	      if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
	    }
	  }, {
	    label: 'Toggle Developer Tools',
	    accelerator: function () {
	      if (process.platform == 'darwin') return 'Alt+Command+I';else return 'Ctrl+Shift+I';
	    }(),
	    click: function click(item, focusedWindow) {
	      if (focusedWindow) focusedWindow.toggleDevTools();
	    }
	  }]
	}, {
	  label: 'Help',
	  role: 'help',
	  submenu: [{
	    label: 'Learn More',
	    click: function click() {
	      __webpack_require__(3).openExternal('http://electron.atom.io');
	    }
	  }]
	}];

	var menu = Menu.buildFromTemplate(template);
	module.exports = menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("shell");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var logger = __webpack_require__(5),
	    fenixAPI = __webpack_require__(15);

	var React = __webpack_require__(16);
	var ReactDOM = __webpack_require__(17);

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
	      logger.info('loading components');

	      var router = __webpack_require__(18),
	          RouterProvider = __webpack_require__(21).RouterProvider,
	          App = __webpack_require__(22);

	      router.start(function () {
	        ReactDOM.render(React.createElement(
	          RouterProvider,
	          { router: router },
	          React.createElement(App, null)
	        ), document.getElementById('container'));
	      });
	    }
	  }, {
	    key: 'loadComponents',
	    value: function loadComponents() {
	      return new Promise(function (resolve, reject) {
	        logger.info('loading components');

	        var MQTTConnectionManager = __webpack_require__(24),
	            MQTTSensorsList = __webpack_require__(29);

	        /*reactDOM.render(
	          <MQTTConnectionManager/>,
	          document.getElementById('mqtt-connection-manager')
	        );
	         reactDOM.render(
	          <MQTTSensorsList/>,
	          document.getElementById('mqtt-sensors-list')
	        );*/

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(6),
	    winston = __webpack_require__(14);

	module.exports = new winston.Logger({
	  level: config.logger.level,
	  transports: [new winston.transports.Console()]
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author Guilhelm Savin
	 * @module config
	 */
	'use strict';

	var _ = __webpack_require__(7);
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	console.log("Fenix running on electron v" + process.versions.electron);
	console.log('ENV is set to', process.env.NODE_ENV);

	/**
	 * Load environment configuration
	 */
	module.exports = _.merge(__webpack_require__(8), __webpack_require__(10)("./" + process.env.NODE_ENV + '.js'));

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var path = __webpack_require__(9),
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
/* 9 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./all.js": 8,
		"./development.js": 11,
		"./index.js": 6,
		"./production.js": 12,
		"./test.js": 13
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
	webpackContext.id = 10;


/***/ },
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ipc = __webpack_require__(2).ipcRenderer;

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
	    value: function send(channel) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      ipc.send.apply(ipc, [channel].concat(args));
	    }
	  }]);

	  return FenixAPI;
	}();

	module.exports = new FenixAPI();

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(19);

	var _router2 = _interopRequireDefault(_router);

	var _router5Listeners = __webpack_require__(20);

	var _router5Listeners2 = _interopRequireDefault(_router5Listeners);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = new _router2.default()
	//
	// Options
	//
	.setOption('useHash', true).setOption('defaultRoute', 'home')
	//
	// Routes
	//
	.addNode('home', '/').addNode('mqtt', '/mqtt').addNode('mqtt.sensor', '/sensor/:sensor')
	//
	// Plugins
	//
	.usePlugin((0, _router5Listeners2.default)());

	module.exports = router;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("router5");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("router5-listeners");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("react-router5");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    Nav = __webpack_require__(23),
	    Main = __webpack_require__(26);

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { id: 'app' },
	        React.createElement(
	          'aside',
	          null,
	          React.createElement(Nav, null)
	        ),
	        React.createElement(
	          'main',
	          null,
	          React.createElement(Main, null)
	        )
	      );
	    }
	  }]);

	  return App;
	}(React.Component);

	module.exports = App;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    BaseLink = __webpack_require__(21).BaseLink,
	    withRoute = __webpack_require__(21).withRoute,
	    MQTTConnectionManager = __webpack_require__(24),
	    Logo = __webpack_require__(25);

	var Nav = function (_React$Component) {
	  _inherits(Nav, _React$Component);

	  function Nav(props) {
	    _classCallCheck(this, Nav);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).call(this, props));
	  }

	  _createClass(Nav, [{
	    key: 'render',
	    value: function render() {
	      var router = this.props.router;

	      return React.createElement(
	        'nav',
	        { id: 'main-nav' },
	        React.createElement(
	          BaseLink,
	          { router: router, routeName: 'home', className: 'icon-link' },
	          React.createElement(Logo, null)
	        ),
	        React.createElement(
	          BaseLink,
	          { router: router, routeName: 'mqtt' },
	          'MQTT'
	        ),
	        React.createElement(
	          'a',
	          null,
	          'Database'
	        ),
	        React.createElement(
	          'a',
	          null,
	          'Network'
	        )
	      );
	    }
	  }]);

	  return Nav;
	}(React.Component);

	module.exports = withRoute(Nav);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    fenix = __webpack_require__(4);

	var MQTTConnectionManager = function (_React$Component) {
	  _inherits(MQTTConnectionManager, _React$Component);

	  function MQTTConnectionManager(props) {
	    _classCallCheck(this, MQTTConnectionManager);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTConnectionManager).call(this, props));

	    _this.state = {
	      status: 'disconnected',
	      uri: {
	        host: '',
	        scheme: ''
	      },
	      error: null
	    };

	    fenix.api.on('/mqtt/state', function (e, state) {
	      _this.setState(state);
	    });
	    return _this;
	  }

	  _createClass(MQTTConnectionManager, [{
	    key: 'doConnect',
	    value: function doConnect() {
	      var host = this.refs.mqttServerHost.value,
	          scheme = this.refs.mqttServerScheme.value;

	      fenix.api.send('/mqtt/action/connect', scheme, host);
	    }
	  }, {
	    key: 'doDisconnect',
	    value: function doDisconnect() {
	      fenix.api.send('/mqtt/action/disconnect');
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(event) {
	      if (this.state.status != 'connected' && this.state.status != 'connecting') this.setState({ uri: { host: event.target.value } });
	    }
	  }, {
	    key: 'keyAction',
	    value: function keyAction(event) {
	      if (event.key == 'Enter' && this.state.status != 'connected') {
	        this.doConnect();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var action = null,
	          icon = 'fa-plug';

	      if (this.state.status == 'connected') {
	        action = this.doDisconnect.bind(this);
	        icon = "fa-ban";
	      } else if (this.state.status == 'connecting') {
	        action = this.doDisconnect.bind(this);
	        icon = "fa-spin fa-cog";
	      } else {
	        action = this.doConnect.bind(this);
	      }

	      return React.createElement(
	        'div',
	        { className: "mqtt-connection-manager " + this.state.status },
	        React.createElement(
	          'select',
	          { ref: 'mqttServerScheme' },
	          React.createElement(
	            'option',
	            { value: 'mqtt' },
	            'mqtt://'
	          ),
	          React.createElement(
	            'option',
	            { value: 'mqtts' },
	            'mqtts://'
	          )
	        ),
	        React.createElement('input', {
	          type: 'text',
	          ref: 'mqttServerHost',
	          value: this.state.uri.host,
	          name: 'mqtt-server-uri',
	          placeholder: 'Enter mqtt server uri...',
	          onKeyPress: this.keyAction.bind(this),
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16);

	var Logo = function (_React$Component) {
	   _inherits(Logo, _React$Component);

	   function Logo() {
	      _classCallCheck(this, Logo);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(Logo).apply(this, arguments));
	   }

	   _createClass(Logo, [{
	      key: 'render',
	      value: function render() {
	         return React.createElement(
	            'svg',
	            {
	               viewBox: '0 0 299.99999 299.68751',
	               id: 'svg2',
	               version: '1.1',
	               className: 'app-logo' },
	            React.createElement(
	               'g',
	               { transform: 'translate(-214.28516,-585.41582)' },
	               React.createElement('path', {
	                  d: 'm 364.28516,585.41582 a 150,150 0 0 0 -150,150 150,150 0 0 0 137.52148,149.37501 125,125 0 0 1 -112.52148,-124.37501 125,125 0 0 1 125,-125 125,125 0 0 1 125,125 125,125 0 0 1 -116.15821,124.68751 150,150 0 0 0 141.15821,-149.68751 150,150 0 0 0 -150,-150 z',
	                  className: 'flame1' }),
	               React.createElement('path', {
	                  d: 'm 364.28516,585.41582 a 125,125 0 0 0 -125,125 125,125 0 0 0 115.01758,124.49999 100,100 0 0 1 -90.01758,-99.49999 100,100 0 0 1 100,-100 100,100 0 0 1 100,100 100,100 0 0 1 -92.92578,99.74999 125,125 0 0 0 117.92578,-124.74999 125,125 0 0 0 -125,-125 z',
	                  className: 'flame2' }),
	               React.createElement('path', {
	                  d: 'm 364.28516,585.41582 a 100,100 0 0 0 -100,100 100,100 0 0 0 92.51367,99.625 75,75 0 0 1 -67.51367,-74.625 75,75 0 0 1 75,-75 75,75 0 0 1 75,75 75,75 0 0 1 -69.69336,74.8125 100,100 0 0 0 94.69336,-99.8125 100,100 0 0 0 -100,-100 z',
	                  className: 'flame3' })
	            )
	         );
	      }
	   }]);

	   return Logo;
	}(React.Component);

	module.exports = Logo;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    routeNode = __webpack_require__(21).routeNode,
	    Home = __webpack_require__(27),
	    MQTT = __webpack_require__(28),
	    NotFound = __webpack_require__(33);

	var components = {
	  'home': Home,
	  'mqtt': MQTT
	};

	var Main = function (_React$Component) {
	  _inherits(Main, _React$Component);

	  function Main(props) {
	    _classCallCheck(this, Main);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this, props));
	  }

	  _createClass(Main, [{
	    key: 'render',
	    value: function render() {
	      var segment = this.props.route.name.split('.')[0],
	          component = React.createElement(components[segment] || NotFound);

	      return React.createElement(
	        'div',
	        { id: 'main' },
	        component
	      );
	    }
	  }]);

	  return Main;
	}(React.Component);

	module.exports = routeNode('')(Main);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    routeNode = __webpack_require__(21).routeNode,
	    nativeImage = __webpack_require__(2).nativeImage,
	    Logo = __webpack_require__(25);

	var icon = nativeImage.createFromPath(__dirname + "/../assets/logo.png");

	var Home = function (_React$Component) {
	  _inherits(Home, _React$Component);

	  function Home(props) {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this, props));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'home' },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'h1',
	            null,
	            'Welcome on Fenix'
	          ),
	          React.createElement(Logo, null)
	        )
	      );
	    }
	  }]);

	  return Home;
	}(React.Component);

	module.exports = routeNode('home')(Home);
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    routeNode = __webpack_require__(21).routeNode,
	    merge = __webpack_require__(7).merge,
	    fenix = __webpack_require__(4),
	    MQTTConnectionManager = __webpack_require__(24),
	    MQTTSensorsList = __webpack_require__(29),
	    MQTTSensorPanel = __webpack_require__(31);

	var MQTT = function (_React$Component) {
	  _inherits(MQTT, _React$Component);

	  function MQTT(props) {
	    _classCallCheck(this, MQTT);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTT).call(this, props));

	    _this.state = {
	      sensors: {}
	    };

	    fenix.api.on('/mqtt/sensors', function (e, sensors) {
	      _this.setState({
	        sensors: sensors
	      });

	      _this.refs.sensorsList.setState({
	        sensors: Object.keys(sensors)
	      });
	    });

	    fenix.api.on('/mqtt/sensor-updated', function (e, sensor) {
	      var update = {
	        sensors: {}
	      };

	      update['sensors'][sensor.name] = sensor;

	      _this.setState(merge(_this.state, update));
	    });
	    return _this;
	  }

	  _createClass(MQTT, [{
	    key: 'render',
	    value: function render() {
	      var content = null;

	      if (this.props.route.name == "mqtt") {
	        content = React.createElement(
	          'div',
	          { className: 'help' },
	          'Please, connect to a server first. Then select a sensor in the list to display informations about it.'
	        );
	      } else {
	        var sensorName = this.props.route.params.sensor || '',
	            sensor = this.state.sensors[sensorName] || { name: 'unknown' };

	        content = React.createElement(MQTTSensorPanel, { sensor: sensor });
	      }

	      return React.createElement(
	        'div',
	        { id: 'mqtt' },
	        React.createElement(
	          'div',
	          { id: 'main-top-bar' },
	          React.createElement(MQTTConnectionManager, null)
	        ),
	        React.createElement(
	          'div',
	          { className: 'mqtt-content' },
	          React.createElement(MQTTSensorsList, { ref: 'sensorsList', sensors: Object.keys(this.state.sensors) }),
	          content
	        )
	      );
	    }
	  }]);

	  return MQTT;
	}(React.Component);

	module.exports = routeNode('mqtt')(MQTT);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    MQTTSensor = __webpack_require__(30);

	var MQTTSensorsList = function (_React$Component) {
	  _inherits(MQTTSensorsList, _React$Component);

	  function MQTTSensorsList(props) {
	    _classCallCheck(this, MQTTSensorsList);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTSensorsList).call(this, props));

	    _this.state = {
	      sensors: props.sensors || []
	    };

	    /*fenix.api.on('/mqtt/sensors', sensors => {
	      this.setState({
	        sensors: sensors
	      });
	    });*/
	    return _this;
	  }

	  _createClass(MQTTSensorsList, [{
	    key: 'render',
	    value: function render() {
	      var sensors = [];

	      this.state.sensors.forEach(function (k) {
	        sensors.push(React.createElement(MQTTSensor, { key: k, name: k }));
	      });

	      return React.createElement(
	        'div',
	        { className: 'mqtt-sensors-list nav' },
	        sensors
	      );
	    }
	  }]);

	  return MQTTSensorsList;
	}(React.Component);

	module.exports = MQTTSensorsList;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    withRoute = __webpack_require__(21).withRoute,
	    BaseLink = __webpack_require__(21).BaseLink,
	    fenix = __webpack_require__(4);

	var MQTTSensor = function (_React$Component) {
	  _inherits(MQTTSensor, _React$Component);

	  function MQTTSensor(props) {
	    _classCallCheck(this, MQTTSensor);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTSensor).call(this, props));
	  }

	  _createClass(MQTTSensor, [{
	    key: 'render',
	    value: function render() {
	      var router = this.props.router;

	      return React.createElement(
	        'div',
	        { className: 'mqtt-sensor' },
	        React.createElement(
	          BaseLink,
	          { router: router, routeName: 'mqtt.sensor', routeParams: { sensor: this.props.name } },
	          this.props.name
	        )
	      );
	    }
	  }]);

	  return MQTTSensor;
	}(React.Component);

	module.exports = withRoute(MQTTSensor);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16),
	    fenix = __webpack_require__(4),
	    DataWidget = __webpack_require__(32);

	var MQTTSensorPanel = function (_React$Component) {
	  _inherits(MQTTSensorPanel, _React$Component);

	  function MQTTSensorPanel(props) {
	    _classCallCheck(this, MQTTSensorPanel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTSensorPanel).call(this, props));
	  }

	  _createClass(MQTTSensorPanel, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var subscribeAction = function subscribeAction() {
	        if (_this2.props.sensor.subscribed) {
	          fenix.api.send('/mqtt/action/unsubscribe', _this2.props.sensor.name);
	        } else {
	          fenix.api.send('/mqtt/action/subscribe', _this2.props.sensor.name);
	        }
	      };

	      var widgets = [];

	      Object.keys(this.props.sensor.types).forEach(function (k) {
	        widgets.push(React.createElement(DataWidget, { data: _this2.props.sensor.types[k], key: _this2.props.sensor.name + '-' + k }));
	      });

	      return React.createElement(
	        'div',
	        { className: "mqtt-sensor-panel" + (this.props.sensor.subscribed ? " subscribed" : "") },
	        React.createElement(
	          'h2',
	          null,
	          this.props.sensor.name,
	          React.createElement(
	            'button',
	            { onClick: subscribeAction },
	            React.createElement(
	              'span',
	              { className: 'subscribed-msg' },
	              'Subscribed'
	            ),
	            React.createElement(
	              'span',
	              { className: 'subscribe-action' },
	              'Subscribe'
	            ),
	            React.createElement(
	              'span',
	              { className: 'unsubscribe-action' },
	              'Unsubscribe'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'data-widget-container' },
	          widgets
	        )
	      );
	    }
	  }]);

	  return MQTTSensorPanel;
	}(React.Component);

	module.exports = MQTTSensorPanel;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16);

	var DataWidget = function (_React$Component) {
	  _inherits(DataWidget, _React$Component);

	  function DataWidget(props) {
	    _classCallCheck(this, DataWidget);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DataWidget).call(this, props));
	  }

	  _createClass(DataWidget, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'data-widget' },
	        React.createElement(
	          'div',
	          { className: 'value' },
	          this.props.data.value
	        ),
	        React.createElement(
	          'div',
	          { className: 'type' },
	          this.props.data.type
	        )
	      );
	    }
	  }]);

	  return DataWidget;
	}(React.Component);

	DataWidget.propTypes = {
	  data: React.PropTypes.object.isRequired
	};

	module.exports = DataWidget;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(16);

	var NotFound = function (_React$Component) {
	  _inherits(NotFound, _React$Component);

	  function NotFound(props) {
	    _classCallCheck(this, NotFound);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFound).call(this, props));
	  }

	  _createClass(NotFound, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "error" },
	        "View not found"
	      );
	    }
	  }]);

	  return NotFound;
	}(React.Component);

	module.exports = NotFound;

/***/ }
/******/ ]);