'use strict';

const React                 = require('react')
    , routeNode             = require('react-router5').routeNode
    , merge                 = require('lodash').merge
    , fenix                 = require('../fenix-ui.js')
    , MQTTConnectionManager = require('./mqtt-connection-manager.jsx')
    , MQTTSensorsList       = require('./mqtt-sensors-list.jsx')
    , MQTTSensorPanel       = require('./mqtt-sensor-panel.jsx');

class MQTT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: {}
    };

    fenix.api.on('/mqtt/sensors', (e, sensors) => {
      this.setState({
        sensors: sensors
      });

      this.refs.sensorsList.setState({
        sensors: Object.keys(sensors)
      });
    });

    fenix.api.on('/mqtt/sensor-updated', (e, sensor) => {
      let update = {
        sensors: {}
      };

      update['sensors'][sensor.name] = sensor;
      console.log("update", update);

      this.setState(merge(this.state, update));
    });
  }

  render() {
    let content = null;

    if (this.props.route.name == "mqtt") {
      content = <div className="help">Please, connect to a server first. Then select a sensor in the list to display informations about it.</div>
    }
    else {
      let sensorName = this.props.route.params.sensor || ''
        , sensor     = this.state.sensors[sensorName] || {name: 'unknown'};

      content = <MQTTSensorPanel sensor={ sensor }/>
    }

    return (
      <div id="mqtt">
        <div id="main-top-bar">
          <MQTTConnectionManager/>
        </div>
        <div className="mqtt-content">
          <MQTTSensorsList ref="sensorsList" sensors={ Object.keys(this.state.sensors) }/>
          { content }
        </div>
      </div>
    );
  }
}

module.exports = routeNode('mqtt')(MQTT);
