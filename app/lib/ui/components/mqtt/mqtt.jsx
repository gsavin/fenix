/*
 * Copyright 2016
 *    Guilhelm Savin <guilhelm.savin@litislab.fr>
 *
 * This file is part of Fenix.
 *
 * This program is free software distributed under the terms of the CeCILL-B
 * license that fits European law. You can  use, modify and/ or redistribute
 * the software under the terms of the CeCILL-B license as circulated by CEA,
 * CNRS and INRIA at the following URL <http://www.cecill.info>.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.
 *
 * You should have received a copy of the CeCILL-B License along with this program.
 * If not, see <http://www.cecill.info/licences/>.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept their terms.
 */
'use strict';

const React                 = require('react')
    , routeNode             = require('react-router5').routeNode
    , merge                 = require('lodash').merge
    , fenix                 = require('../../fenix-ui.js')
    , MQTTConnectionManager = require('./mqtt-connection-manager.jsx')
    , MQTTSensorsList       = require('./mqtt-sensors-list.jsx')
    , MQTTSensorPanel       = require('./mqtt-sensor-panel.jsx');

/**
 * Main MQTT component.
 *
 * It contains the view to interact with MQTT module such that the user can
 * control the connection to MQTT server, get a list of available sensors, or
 * displaying data about sensor.
 *
 */
class MQTT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: {}
    };

    this.onMQTTSensors = this.onMQTTSensors.bind(this);
    this.onMQTTSensorUpdated = this.onMQTTSensorUpdated.bind(this);
  }

  /**
   * Listener for the '/mqtt/sensors' channel.
   *
   * It is expecting an object containing a mapping between sensor name and data
   * associated with this sensor.
   *
   */
  onMQTTSensors(e, sensors) {
    this.setState({
      sensors: sensors
    });

    this.refs.sensorsList.setState({
      sensors: sensors
    });
  }

  /**
   * Listener for the '/mqtt/sensor-updated' channel.
   *
   * It is expecting the part of sensors that has changed. Actual sensors state
   * is merged with this patch.
   *
   */
  onMQTTSensorUpdated(e, sensor) {
    let update = {
      sensors: {}
    };

    update['sensors'][sensor.name] = sensor;

    this.setState(merge(this.state, update));
  }

  /**
   *  Method called by React when the component did mount.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   * When MQTT has been mount, it registers its listeners for MQTT updates and
   * asks for a refresh.
   *
   */
  componentDidMount() {
    fenix.api.on('/mqtt/sensors', this.onMQTTSensors);
    fenix.api.on('/mqtt/sensor-updated', this.onMQTTSensorUpdated);

    fenix.api.send('/mqtt/action/refresh');
  }

  /**
   * Method called by React when the component will unmount.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   * Before MQTT will unmount, it removes its listeners from MQTT updates.
   *
   */
  componentWillUnmount() {
    fenix.api.removeListener('/mqtt/sensors', this.onMQTTSensors);
    fenix.api.removeListener('/mqtt/sensor-updated', this.onMQTTSensorUpdated);
  }

  /**
   * Method called by React when rendering the component.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   *
   */
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
          <MQTTSensorsList ref="sensorsList" sensors={ this.state.sensors }/>
          { content }
        </div>
      </div>
    );
  }
}

module.exports = routeNode('mqtt')(MQTT);
