'use strict';

const React       = require('react')
    , routeNode   = require('react-router5').routeNode
    , nativeImage = require('electron').nativeImage
    , Logo        = require('./logo.jsx');

const icon = nativeImage.createFromPath(__dirname + "/../assets/logo.png");

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <div>
          <h1>Welcome on Fenix</h1>
          <Logo/>
        </div>
      </div>
    );
  }
}

module.exports = routeNode('home')(Home);
