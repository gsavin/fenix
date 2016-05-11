'use strict';

const React = require('react')
    , fenix = require('../fenix-ui.js');

class MQTTSensorsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: {}
    };

    fenix.api.on('/mqtt/sensors', sensors => {
      this.setState({
        sensors: sensors
      });
    });
  }

  render() {
    let sensors = [];

    Object.keys(this.state.sensors).forEach(k => {
      sensors.push(<li>{ k }</li>);
    });

    return <ul>{ sensors }</ul>
  }
}

module.exports = MQTTSensorsList;
