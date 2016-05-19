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

	var React = __webpack_require__(5),
	    ReactDOM = __webpack_require__(6),
	    logger = __webpack_require__(7),
	    fenixAPI = __webpack_require__(14),
	    config = __webpack_require__(8);

	var FenixUI = function () {
	  function FenixUI() {
	    _classCallCheck(this, FenixUI);
	  }

	  _createClass(FenixUI, [{
	    key: 'init',
	    value: function init() {
	      var router = __webpack_require__(15),
	          RouterProvider = __webpack_require__(18).RouterProvider,
	          App = __webpack_require__(19);

	      router.start(function () {
	        ReactDOM.render(React.createElement(
	          RouterProvider,
	          { router: router },
	          React.createElement(App, null)
	        ), document.getElementById('container'));
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
	  }, {
	    key: 'config',
	    get: function get() {
	      return config;
	    }
	  }]);

	  return FenixUI;
	}();

	module.exports = new FenixUI();

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(8),
	    winston = __webpack_require__(13);

	module.exports = new winston.Logger({
	  level: config.get("logger").level,
	  transports: [new winston.transports.Console()]
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author Guilhelm Savin
	 * @module config
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var os = __webpack_require__(9),
	    path = __webpack_require__(10),
	    fs = __webpack_require__(11);

	var _ = __webpack_require__(12);
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

	console.log("Fenix running on electron v" + process.versions.electron);
	console.log('ENV is set to', process.env.NODE_ENV);

	var FenixConfiguration = function () {
	  function FenixConfiguration() {
	    _classCallCheck(this, FenixConfiguration);

	    this.config = {
	      logger: {
	        level: 'debug'
	      }
	    };
	  }

	  _createClass(FenixConfiguration, [{
	    key: 'loadUserConfiguration',
	    value: function loadUserConfiguration() {
	      try {
	        var stat = fs.statSync(this.userConfigurationPath);

	        if (stat.isFile()) {
	          var content = fs.readFileSync(this.userConfigurationPath);
	          this.config = JSON.parse(content);

	          return true;
	        }

	        return false;
	      } catch (err) {
	        return false;
	      }
	    }
	  }, {
	    key: 'saveUserConfiguration',
	    value: function saveUserConfiguration() {
	      var configDir = path.dirname(this.userConfigurationPath);

	      try {
	        var stat = fs.statSync(configDir);

	        if (!stat.isDirectory()) {
	          throw configDir + ' is not a directory';
	        }
	      } catch (err) {
	        fs.mkdirSync(configDir);
	      }

	      try {
	        fs.writeFileSync(this.userConfigurationPath, JSON.stringify(this.config, null, 2));
	      } catch (err) {
	        console.log("Unable to write configuration:", err);
	      }
	    }
	  }, {
	    key: 'has',
	    value: function has(name) {
	      var path = name.split('.'),
	          d = this.config;

	      for (var i = 0; i < path.length; i++) {
	        if (!(d instanceof Object) || d[path[i]] == undefined) {
	          return false;
	        }

	        d = d[path[i]];
	      }

	      return true;
	    }
	  }, {
	    key: 'get',
	    value: function get(name) {
	      var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	      var path = name.split('.'),
	          d = this.config;

	      for (var i = 0; i < path.length - 1; i++) {
	        d = d[path[i]] || {};
	      }

	      return d[path[path.length - 1]] || defaultValue;
	    }
	  }, {
	    key: 'set',
	    value: function set(name, value) {
	      var save = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      var path = name.split('.'),
	          d = this.config;

	      for (var i = 0; i < path.length - 1; i++) {
	        if (!d[path[i]] || !(d[path[i]] instanceof Object)) {
	          d[path[i]] = {};
	        }

	        d = d[path[i]];
	      }

	      d[path[path.length - 1]] = value;

	      if (save) {
	        this.saveUserConfiguration();
	      }
	    }
	  }, {
	    key: 'configurationExists',
	    value: function configurationExists() {
	      try {
	        fs.statSync(this.userConfigurationPath);
	        return true;
	      } catch (err) {
	        return false;
	      }
	    }
	  }, {
	    key: 'userConfigurationPath',
	    get: function get() {
	      return path.join(os.homedir(), '.fenix', 'config.json');
	    }
	  }]);

	  return FenixConfiguration;
	}();

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

	var cfg = new FenixConfiguration();
	cfg.loadUserConfiguration();

	module.exports = cfg;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 14 */
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
	    key: 'removeListener',
	    value: function removeListener(channel, cb) {
	      ipc.removeListener(channel, cb);
	    }
	  }, {
	    key: 'send',
	    value: function send(channel) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      ipc.send.apply(ipc, [channel].concat(args));
	    }
	  }, {
	    key: 'get',
	    value: function get(channel) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      return ipc.sendSync.apply(ipc, [channel].concat(args));
	    }
	  }]);

	  return FenixAPI;
	}();

	module.exports = new FenixAPI();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(16);

	var _router2 = _interopRequireDefault(_router);

	var _router5Listeners = __webpack_require__(17);

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
/* 16 */
/***/ function(module, exports) {

	module.exports = require("router5");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("router5-listeners");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("react-router5");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    Nav = __webpack_require__(20),
	    Main = __webpack_require__(24);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    BaseLink = __webpack_require__(18).BaseLink,
	    withRoute = __webpack_require__(18).withRoute,
	    MQTTConnectionManager = __webpack_require__(21),
	    Logo = __webpack_require__(23);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2016
	 *    Guilhelm Savin <guilhelm.savin@litislab.fr>
	 *
	 * This file is part of Fenix.
	 *
	 * This program is free software distributed under the terms of the CeCILL-B
	 * license that fits European law. You can  use, modify and/ or redistribute
	 * the software under the terms of the CeCILL-B license as circulated by CEA,
	 * CNRS and INRIA at the following URL <http://www.cecill.info>.
	 *
	 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
	 * PARTICULAR PURPOSE.
	 *
	 * You should have received a copy of the CeCILL-B License along with this program.
	 * If not, see <http://www.cecill.info/licences/>.
	 *
	 * The fact that you are presently reading this means that you have had
	 * knowledge of the CeCILL-B license and that you accept their terms.
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    Modal = __webpack_require__(22),
	    merge = __webpack_require__(12).merge,
	    fenix = __webpack_require__(4);

	var MQTTConnectionManagerAddServer = function (_React$Component) {
	  _inherits(MQTTConnectionManagerAddServer, _React$Component);

	  function MQTTConnectionManagerAddServer(props) {
	    _classCallCheck(this, MQTTConnectionManagerAddServer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTConnectionManagerAddServer).call(this, props));

	    _this.state = {
	      formIsOpened: false
	    };

	    _this.doAddServer = _this.doAddServer.bind(_this);
	    return _this;
	  }

	  _createClass(MQTTConnectionManagerAddServer, [{
	    key: 'openForm',
	    value: function openForm() {
	      this.setState({
	        formIsOpened: true
	      });
	    }
	  }, {
	    key: 'closeForm',
	    value: function closeForm() {
	      this.setState({
	        formIsOpened: false
	      });
	    }
	  }, {
	    key: 'doAddServer',
	    value: function doAddServer() {
	      var server = {
	        name: this.refs.serverName.value,
	        scheme: this.refs.serverScheme.value,
	        host: this.refs.serverHost.value
	      };

	      fenix.api.send('/mqtt/servers/add', server.name, server);
	      this.closeForm();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'mqtt-connection-manager-add-server' },
	        React.createElement(
	          Modal,
	          {
	            isOpen: this.state.formIsOpened,
	            className: 'modal',
	            overlayClassName: 'modal-overlay' },
	          React.createElement(
	            'button',
	            { onClick: this.closeForm.bind(this), className: 'close' },
	            React.createElement('i', { className: 'fa fa-times-circle' })
	          ),
	          React.createElement(
	            'h2',
	            null,
	            'Add new server'
	          ),
	          React.createElement(
	            'div',
	            { className: 'select-input-combo' },
	            React.createElement(
	              'select',
	              { ref: 'serverScheme' },
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
	              ref: 'serverHost',
	              name: 'mqtt-server-uri',
	              placeholder: 'Server host' })
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-button-combo' },
	            React.createElement('input', {
	              type: 'text',
	              ref: 'serverName',
	              placeholder: 'Name' }),
	            React.createElement(
	              'button',
	              { role: 'submit', onClick: this.doAddServer },
	              'Add server'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return MQTTConnectionManagerAddServer;
	}(React.Component);

	var statusIcons = {
	  'connected': 'fa-plug',
	  'connecting': 'fa-spin fa-cog',
	  'disconnected': 'fa-ban'
	};

	/**
	 * MQTT connection manager component.
	 *
	 * It allows to display the current state of the MQTT connection and to connect
	 * to a server.
	 *
	 */

	var MQTTConnectionManager = function (_React$Component2) {
	  _inherits(MQTTConnectionManager, _React$Component2);

	  function MQTTConnectionManager(props) {
	    _classCallCheck(this, MQTTConnectionManager);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTConnectionManager).call(this, props));

	    _this2.state = {
	      state: fenix.api.get('/mqtt/state/get'),
	      servers: fenix.api.get('/mqtt/servers/get')
	    };

	    _this2.onMQTTState = _this2.onMQTTState.bind(_this2);
	    _this2.onMQTTServers = _this2.onMQTTServers.bind(_this2);
	    return _this2;
	  }

	  /**
	   * Listener for the '/mqtt/state' channel.
	   *
	   */


	  _createClass(MQTTConnectionManager, [{
	    key: 'onMQTTState',
	    value: function onMQTTState(e, state) {
	      var u = {
	        state: state
	      };

	      this.setState(merge(this.state, u));
	    }
	  }, {
	    key: 'onMQTTServers',
	    value: function onMQTTServers(e, servers) {
	      var u = {
	        servers: servers
	      };

	      this.setState(merge(this.state, u));
	    }

	    /**
	     *  Method called by React when the component did mount.
	     *
	     * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	     * When MQTTConnectionManager has been mount, it registers its listeners for
	     * MQTT state updates and asks for a refresh.
	     *
	     */

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      fenix.api.on('/mqtt/state', this.onMQTTState);
	      fenix.api.on('/mqtt/servers', this.onMQTTServers);
	    }

	    /**
	     * Method called by React when the component will unmount.
	     *
	     * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	     * Before MQTT will unmount, it removes its listeners from MQTT updates.
	     *
	     */

	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      fenix.api.removeListener('/mqtt/state', this.onMQTTState);
	      fenix.api.removeListener('/mqtt/servers', this.onMQTTServers);
	    }
	  }, {
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
	    key: 'connectTo',
	    value: function connectTo(serverName) {
	      var server = this.state.servers[serverName];

	      if (server) {
	        fenix.api.send('/mqtt/action/connect', server.scheme, server.host);
	      }

	      this.refs.mqttServers.classList.remove('opened');
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
	    key: 'openForm',
	    value: function openForm() {
	      this.refs.addServer.openForm();
	    }

	    /**
	     * Method called by React when rendering the component.
	     *
	     * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	     *
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var icon = statusIcons[this.state.state.status];

	      var toggler = function toggler() {
	        _this3.refs.mqttServers.classList.toggle('opened');
	      };

	      var serversComponents = [];

	      var message = '';

	      switch (this.state.state.status) {
	        case 'connected':
	          message = 'Connected to ' + this.state.state.uri.host;
	          break;
	        case 'connecting':
	          message = 'Trying to connect to ' + this.state.state.uri.host;
	          break;
	        case 'disconnected':
	          message = 'You are not connected';
	          break;
	        case 'error':
	          message = 'An error occured "' + this.state.state.error + '"';
	          break;
	        default:
	          message = '';
	          break;
	      }

	      Object.keys(this.state.servers).forEach(function (name) {
	        var server = _this3.state.servers[name],
	            action = _this3.connectTo.bind(_this3, name);

	        serversComponents.push(React.createElement(
	          'button',
	          { className: 'mqtt-server', key: server.name, onClick: action },
	          React.createElement('i', { className: 'fa fa-3x fa-server' }),
	          React.createElement(
	            'div',
	            { className: 'mqtt-server-name' },
	            server.name
	          )
	        ));
	      });

	      return React.createElement(
	        'div',
	        { className: "mqtt-connection-manager " + this.state.state.status },
	        React.createElement(
	          'div',
	          { className: 'mqtt-status-bar' },
	          React.createElement(
	            'span',
	            { className: 'message' },
	            React.createElement('i', { className: "fa fa-lg fa-fw " + icon }),
	            ' ',
	            message
	          ),
	          React.createElement(
	            'button',
	            { onClick: toggler, className: 'toggler' },
	            React.createElement('i', { className: 'fa fa-lg fa-caret-down' })
	          )
	        ),
	        React.createElement(
	          'div',
	          { ref: 'mqttServers', className: 'mqtt-servers' },
	          serversComponents,
	          React.createElement(
	            'button',
	            {
	              onClick: this.openForm.bind(this),
	              className: 'mqtt-server mqtt-add-server' },
	            React.createElement('i', { className: 'fa fa-3x fa-plus' }),
	            React.createElement(
	              'div',
	              { className: 'mqtt-server-name' },
	              'new'
	            )
	          ),
	          React.createElement(MQTTConnectionManagerAddServer, { ref: 'addServer' })
	        )
	      );
	    }
	  }]);

	  return MQTTConnectionManager;
	}(React.Component);

	module.exports = MQTTConnectionManager;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("react-modal");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    routeNode = __webpack_require__(18).routeNode,
	    Home = __webpack_require__(25),
	    MQTT = __webpack_require__(26),
	    NotFound = __webpack_require__(31);

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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    routeNode = __webpack_require__(18).routeNode,
	    nativeImage = __webpack_require__(2).nativeImage,
	    Logo = __webpack_require__(23);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2016
	 *    Guilhelm Savin <guilhelm.savin@litislab.fr>
	 *
	 * This file is part of Fenix.
	 *
	 * This program is free software distributed under the terms of the CeCILL-B
	 * license that fits European law. You can  use, modify and/ or redistribute
	 * the software under the terms of the CeCILL-B license as circulated by CEA,
	 * CNRS and INRIA at the following URL <http://www.cecill.info>.
	 *
	 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
	 * PARTICULAR PURPOSE.
	 *
	 * You should have received a copy of the CeCILL-B License along with this program.
	 * If not, see <http://www.cecill.info/licences/>.
	 *
	 * The fact that you are presently reading this means that you have had
	 * knowledge of the CeCILL-B license and that you accept their terms.
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    routeNode = __webpack_require__(18).routeNode,
	    merge = __webpack_require__(12).merge,
	    fenix = __webpack_require__(4),
	    MQTTConnectionManager = __webpack_require__(21),
	    MQTTSensorsList = __webpack_require__(27),
	    MQTTSensorPanel = __webpack_require__(29);

	/**
	 * Main MQTT component.
	 *
	 * It contains the view to interact with MQTT module such that the user can
	 * control the connection to MQTT server, get a list of available sensors, or
	 * displaying data about sensor.
	 *
	 */

	var MQTT = function (_React$Component) {
	  _inherits(MQTT, _React$Component);

	  function MQTT(props) {
	    _classCallCheck(this, MQTT);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTT).call(this, props));

	    _this.state = {
	      sensors: {}
	    };

	    _this.onMQTTSensors = _this.onMQTTSensors.bind(_this);
	    _this.onMQTTSensorUpdated = _this.onMQTTSensorUpdated.bind(_this);
	    return _this;
	  }

	  /**
	   * Listener for the '/mqtt/sensors' channel.
	   *
	   * It is expecting an object containing a mapping between sensor name and data
	   * associated with this sensor.
	   *
	   */


	  _createClass(MQTT, [{
	    key: 'onMQTTSensors',
	    value: function onMQTTSensors(e, sensors) {
	      this.setState({
	        sensors: sensors
	      });

	      console.log(sensors);

	      this.refs.sensorsList.setState({
	        sensors: sensors
	      });
	    }

	    /**
	     * Listener for the '/mqtt/sensor-updated' channel.
	     *
	     * It is expecting the part of sensors that has changed. Actual sensors state
	     * is merged with this patch.
	     *
	     */

	  }, {
	    key: 'onMQTTSensorUpdated',
	    value: function onMQTTSensorUpdated(e, sensor) {
	      var update = {
	        sensors: {}
	      };

	      update['sensors'][sensor.name] = sensor;

	      this.setState(merge(this.state, update));
	    }

	    /**
	     *  Method called by React when the component did mount.
	     *
	     * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	     * When MQTT has been mount, it registers its listeners for MQTT updates and
	     * asks for a refresh.
	     *
	     */

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log("mount");

	      fenix.api.on('/mqtt/sensors', this.onMQTTSensors);
	      fenix.api.on('/mqtt/sensor-updated', this.onMQTTSensorUpdated);

	      fenix.api.send('/mqtt/action/refresh');
	    }

	    /**
	     * Method called by React when the component will unmount.
	     *
	     * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	     * Before MQTT will unmount, it removes its listeners from MQTT updates.
	     *
	     */

	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      console.log("unmount");

	      fenix.api.removeListener('/mqtt/sensors', this.onMQTTSensors);
	      fenix.api.removeListener('/mqtt/sensor-updated', this.onMQTTSensorUpdated);
	    }

	    /**
	     * Method called by React when rendering the component.
	     *
	     * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	     *
	     */

	  }, {
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
	          React.createElement(MQTTSensorsList, { ref: 'sensorsList', sensors: this.state.sensors }),
	          content
	        )
	      );
	    }
	  }]);

	  return MQTT;
	}(React.Component);

	module.exports = routeNode('mqtt')(MQTT);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2016
	 *    Guilhelm Savin <guilhelm.savin@litislab.fr>
	 *
	 * This file is part of Fenix.
	 *
	 * This program is free software distributed under the terms of the CeCILL-B
	 * license that fits European law. You can  use, modify and/ or redistribute
	 * the software under the terms of the CeCILL-B license as circulated by CEA,
	 * CNRS and INRIA at the following URL <http://www.cecill.info>.
	 *
	 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
	 * PARTICULAR PURPOSE.
	 *
	 * You should have received a copy of the CeCILL-B License along with this program.
	 * If not, see <http://www.cecill.info/licences/>.
	 *
	 * The fact that you are presently reading this means that you have had
	 * knowledge of the CeCILL-B license and that you accept their terms.
	 */
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    MQTTSensorsListItem = __webpack_require__(28);

	/**
	 * A navigable list of sensors.
	 *
	 */

	var MQTTSensorsList = function (_React$Component) {
	  _inherits(MQTTSensorsList, _React$Component);

	  function MQTTSensorsList(props) {
	    _classCallCheck(this, MQTTSensorsList);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTSensorsList).call(this, props));

	    _this.state = {
	      sensors: _this.props.sensors
	    };
	    return _this;
	  }

	  /**
	   * Method called by React when rendering the component.
	   *
	   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
	   *
	   */


	  _createClass(MQTTSensorsList, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var sensors = [];

	      Object.keys(this.state.sensors).forEach(function (k) {
	        sensors.push(React.createElement(MQTTSensorsListItem, { key: k, name: k, subscribed: _this2.state.sensors[k].subscribed }));
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

	MQTTSensorsList.propTypes = {
	  sensors: React.PropTypes.object.isRequired
	};

	module.exports = MQTTSensorsList;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    withRoute = __webpack_require__(18).withRoute,
	    BaseLink = __webpack_require__(18).BaseLink,
	    fenix = __webpack_require__(4);

	var MQTTSensorsListItem = function (_React$Component) {
	  _inherits(MQTTSensorsListItem, _React$Component);

	  function MQTTSensorsListItem(props) {
	    _classCallCheck(this, MQTTSensorsListItem);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(MQTTSensorsListItem).call(this, props));
	  }

	  _createClass(MQTTSensorsListItem, [{
	    key: 'render',
	    value: function render() {
	      var router = this.props.router;

	      return React.createElement(
	        'div',
	        { className: "mqtt-sensor-list-item" + (this.props.subscribed ? ' subscribed' : '') },
	        React.createElement(
	          BaseLink,
	          { router: router, routeName: 'mqtt.sensor', routeParams: { sensor: this.props.name } },
	          this.props.name,
	          React.createElement('i', { className: 'subscribed-icon fa fa-plug' })
	        )
	      );
	    }
	  }]);

	  return MQTTSensorsListItem;
	}(React.Component);

	module.exports = withRoute(MQTTSensorsListItem);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5),
	    fenix = __webpack_require__(4),
	    DataWidget = __webpack_require__(30);

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5);

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(5);

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