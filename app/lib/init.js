'use strict';

(function() {
  var fenix = require('./lib/fenix.js');

  /*
   * Initializing the base tag...
   */

  var base = document.createElement("base");
  base.setAttribute("href", "//" + __dirname + "/default.html");
  document.head.appendChild(base);

  fenix.logger.debug("init fenix");
  fenix.init()
  .then(
    
    function() {
      fenix.logger.debug("init ok");
    },

    function(err) {
      fenix.logger.debug("init failed", err);
    }
  );
})();
