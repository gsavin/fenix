'use strict';

(function() {
  var fenix = require('./lib/fenix-ui.js');

  /*
   * Initializing the base tag...
   */

  var base = document.createElement("base");
  base.setAttribute("href", "//" + __dirname + "/");
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
  )
  .catch(function (err) {
    fenix.logger.error(err);
  });
})();
