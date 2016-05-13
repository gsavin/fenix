'use strict';

const React     = require('react')
    , routeNode = require('react-router5').routeNode;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <h1>Welcome on Fenix</h1>
      </div>
    );
  }
}

module.exports = routeNode('home')(Home);
