'use strict';

const menu    = require('./menu.js')
    , remote  = require('electron').remote;

(function() {
  var fenix = require('./fenix-ui.js');

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
