'use strict';

const React     = require('react')
    , withRoute = require('react-router5').withRoute
    , BaseLink  = require('react-router5').BaseLink
    , fenix     = require('../fenix-ui.js');

class MQTTSensorsListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const router = this.props.router;

    return (
      <div className={ "mqtt-sensor-list-item" + (this.props.subscribed ? ' subscribed' : '') }>
        <BaseLink router={ router } routeName="mqtt.sensor" routeParams={{sensor: this.props.name}}>{ this.props.name }<i className="subscribed-icon fa fa-plug"></i></BaseLink>
      </div>
    );
  }
}

module.exports = withRoute(MQTTSensorsListItem);
