'use strict';

(function() {
  var fenix = require('./lib/fenix.js');

  /*
   * Initializing the base tag...
   */

  var base = document.createElement("base");
  base.setAttribute("href", "//" + __dirname + "/default.html");
  document.head.appendChild(base);

  try {
    fenix.init();
  } catch(e) {
    fenix.logger.error(e);
  }
})();
