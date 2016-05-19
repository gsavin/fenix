'use strict';


const React     = require('react')
    , ReactDOM  = require('react-dom')
    , logger    = require('../logger.js')
    , fenixAPI  = require('./api.js')
    , config    = require('../config');

class FenixUI {
  get logger() {
    return logger;
  }

  get api() {
    return fenixAPI;
  }

  get config() {
    return config;
  }

  init() {
    const router          = require('./router.js')
        , RouterProvider  = require('react-router5').RouterProvider
        , App             = require('./components/app.jsx');

    router.start(() => {
      ReactDOM.render(
        <RouterProvider router={ router }><App/></RouterProvider>,
        document.getElementById('container')
      );
    });
  }
}

module.exports = new FenixUI();
