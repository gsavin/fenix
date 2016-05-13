'use strict';

const React     = require('react')
    , fenix     = require('../fenix-ui.js')
    , ItemList  = require('./item-list.jsx');

class MQTTSensorPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let subscribeAction = () => {
      console.log("subscribe", this.props.sensor.name);
      fenix.api.send('/mqtt/action/subscribe', this.props.sensor.name);
    };

    return (
      <div className={ "mqtt-sensor-panel" + (this.props.sensor.subscribed ? " subscribed" : "") }>
        <h2>{ this.props.sensor.name } <button onClick={ subscribeAction }>Subscribe</button></h2>
        <ItemList items={ this.props.sensor.types }/>
      </div>
    );
  }
}

module.exports = MQTTSensorPanel;
