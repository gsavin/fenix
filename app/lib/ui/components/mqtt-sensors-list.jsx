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

const React               = require('react')
    , MQTTSensorsListItem = require('./mqtt-sensors-list-item.jsx');

/**
 * A navigable list of sensors.
 *
 */
class MQTTSensorsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: this.props.sensors
    };
  }

  /**
   * Method called by React when rendering the component.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   *
   */
  render() {
    let sensors = [];

    Object.keys(this.state.sensors).forEach(k => {
      sensors.push(<MQTTSensorsListItem key={ k } name={ k } subscribed={ this.state.sensors[k].subscribed }/>);
    });

    return (
      <div className="mqtt-sensors-list nav">{ sensors }</div>
    );
  }
}

MQTTSensorsList.propTypes = {
    sensors: React.PropTypes.object.isRequired
};

module.exports = MQTTSensorsList;
