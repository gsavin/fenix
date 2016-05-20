const React     = require('react')
    , routeNode = require('react-router5').routeNode
    , Home      = require('./home.jsx')
    , MQTT      = require('./mqtt/mqtt.jsx')
    , NotFound  = require('./not-found.jsx');

const components = {
  'home': Home,
  'mqtt': MQTT
};

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const segment   = this.props.route.name.split('.')[0]
        , component = React.createElement(components[segment] || NotFound);

    return (
      <div id="main">{ component }</div>
    );
  }
}

module.exports = routeNode('')(Main);
