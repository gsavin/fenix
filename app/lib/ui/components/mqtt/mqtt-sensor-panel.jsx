'use strict';

const React       = require('react')
    , fenix       = require('../../fenix-ui.js')
    , DataWidget  = require('../data-widget.jsx');

class MQTTSensorPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let subscribeAction = () => {
      if (this.props.sensor.subscribed) {
        fenix.api.send('/mqtt/action/unsubscribe', this.props.sensor.name);
      }
      else {
        fenix.api.send('/mqtt/action/subscribe', this.props.sensor.name);
      }
    };

    let widgets = [];

    Object.keys(this.props.sensor.types).forEach(k => {
      widgets.push(<DataWidget data={ this.props.sensor.types[k] } key={ this.props.sensor.name + '-' + k }/>);
    });

    return (
      <div className={ "mqtt-sensor-panel" + (this.props.sensor.subscribed ? " subscribed" : "") }>
        <h2>{ this.props.sensor.name }
          <button onClick={ subscribeAction }>
            <span className="subscribed-msg">Subscribed</span>
            <span className="subscribe-action">Subscribe</span>
            <span className="unsubscribe-action">Unsubscribe</span>
          </button>
        </h2>
        <div className="data-widget-container">
          { widgets }
        </div>
      </div>
    );
  }
}

module.exports = MQTTSensorPanel;
