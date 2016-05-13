'use strict';

const React = require('react')
    , fenix = require('../fenix-ui.js');

class MQTTConnectionManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'disconnected',
      uri: {
        host: '',
        scheme: ''
      },
      error: null
    };

    fenix.api.on('/mqtt/state', (e, state) => {
      this.setState(state);
    });
  }

  doConnect() {
    let host    = this.refs.mqttServerHost.value
      , scheme  = this.refs.mqttServerScheme.value;

    fenix.api.send('/mqtt/action/connect', scheme, host);
  }

  doDisconnect() {
    fenix.api.send('/mqtt/action/disconnect');
  }

  handleChange(event) {
    if (this.state.status != 'connected' && this.state.status != 'connecting')
      this.setState({uri: {host: event.target.value}});
  }

  keyAction(event) {
    if (event.key == 'Enter' && this.state.status != 'connected') {
      this.doConnect();
    }
  }

  render() {
    let action = null
      , icon   = 'fa-plug';

    if (this.state.status == 'connected') {
      action = this.doDisconnect.bind(this);
      icon   = "fa-ban";
    }
    else if (this.state.status == 'connecting') {
      action = this.doDisconnect.bind(this);
      icon   = "fa-spin fa-cog";
    }
    else {
      action = this.doConnect.bind(this);
    }

    return (
      <div className={ "mqtt-connection-manager " + this.state.status }>
        <select ref="mqttServerScheme">
          <option value="mqtt">mqtt://</option>
          <option value="mqtts">mqtts://</option>
        </select>
        <input
          type="text"
          ref="mqttServerHost"
          value={ this.state.uri.host }
          name="mqtt-server-uri"
          placeholder="Enter mqtt server uri..."
          onKeyPress={ this.keyAction.bind(this) }
          onChange={ this.handleChange.bind(this) } />

        <button className="action" onClick={ action }>
          <i className={ "fa fa-fw " + icon }></i>
        </button>
      </div>
    );
  }
}

module.exports = MQTTConnectionManager;
