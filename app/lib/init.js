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
    console.log(e);
  }

  var sensors = fenix.modules['sensors'];
  sensors.on('new-sensor', function(sensor) {
    console.log(`new sensor "${sensor.identifiant}"`);
  });

  sensors.controller.list(function(sensor) {
    console.log(`- ${sensor.identifiant}`);
  })
  .then(function() {
    console.log("fin de la liste");
  })
  .catch(function(err) {
    console.log("erreur de liste", err);
  });
})();
