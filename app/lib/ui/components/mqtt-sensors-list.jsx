'use strict';

const React       = require('react')
    , MQTTSensor  = require('./mqtt-sensor.jsx');

class MQTTSensorsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: props.sensors || []
    };

    /*fenix.api.on('/mqtt/sensors', sensors => {
      this.setState({
        sensors: sensors
      });
    });*/
  }

  render() {
    let sensors = [];

    this.state.sensors.forEach(k => {
      sensors.push(<MQTTSensor key={ k } name={ k }/>);
    });

    return (
      <div className="mqtt-sensors-list nav">{ sensors }</div>
    );
  }
}

module.exports = MQTTSensorsList;
