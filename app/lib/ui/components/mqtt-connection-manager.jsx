'use strict';

const React = require('react')
    , fenix = require('../fenix-ui.js');

class MQTTConnectionManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'disconnected',
      uri: '',
      error: null
    };

    fenix.api.on('/mqtt/state', state => {
      this.setState(state);
    });
  }

  doConnect() {
    fenix.api.send('/mqtt/action/connect', this.refs.mqttServerURI.value);
  }

  doDisconnect() {
    fenix.api.send('/mqtt/action/disconnect');
  }

  handleChange(event) {
    if (this.state.status != 'connected' && this.state.status != 'connecting')
      this.setState({uri: event.target.value});
  }

  render() {
    let action = null
      , icon   = 'fa-plug';

    if (this.state.status == 'connected') {
      action = this.doDisconnect.bind(this);
      icon   = "fa-ban";
    }
    else {
      action = this.doConnect.bind(this);

      if (this.state.status == 'connecting') {
        icon = "fa-spin fa-cog";
      }
    }

    return <div className={ "mqtt-connection-manager " + this.state.status }>
      <input
        type="text"
        ref="mqttServerURI"
        value={ this.state.uri }
        name="mqtt-server-uri"
        placeholder="Enter mqtt server uri..."
        onChange={ this.handleChange.bind(this) } />

      <button className="action" onClick={ action }>
        <i className={ "fa fa-fw " + icon }></i>
      </button>
    </div>
  }
}

module.exports = MQTTConnectionManager;
