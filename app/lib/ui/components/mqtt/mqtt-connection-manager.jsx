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

const React = require('react')
    , Modal = require('react-modal')
    , merge = require('lodash').merge
    , fenix = require('../../fenix-ui.js');

class MQTTConnectionManagerAddServer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formIsOpened: false
    };

    this.doAddServer = this.doAddServer.bind(this);
  }

  openForm() {
    this.setState({
      formIsOpened: true
    });
  }

  closeForm() {
    this.setState({
      formIsOpened: false
    });
  }

  doAddServer() {
    let server = {
      name: this.refs.serverName.value,
      scheme: this.refs.serverScheme.value,
      host: this.refs.serverHost.value
    };

    fenix.api.send('/mqtt/servers/add', server.name, server);
    this.closeForm();
  }

  render() {
    return (
      <div className="mqtt-connection-manager-add-server">
        <Modal
          isOpen={ this.state.formIsOpened }
          className="modal"
          overlayClassName="modal-overlay">
          <button onClick={ this.closeForm.bind(this) } className="close"><i className="fa fa-times-circle"></i></button>
          <h2>Add new server</h2>
          <div className="select-input-combo">
            <select ref="serverScheme">
              <option value="mqtt">mqtt://</option>
              <option value="mqtts">mqtts://</option>
            </select>
            <input
              type="text"
              ref="serverHost"
              name="mqtt-server-uri"
              placeholder="Server host" />
          </div>
          <div className="input-button-combo">
            <input
              type="text"
              ref="serverName"
              placeholder="Name" />
            <button role="submit" onClick={ this.doAddServer }>Add server</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const statusIcons = {
  'connected': 'fa-plug',
  'connecting': 'fa-spin fa-cog',
  'disconnected': 'fa-ban'
};

/**
 * MQTT connection manager component.
 *
 * It allows to display the current state of the MQTT connection and to connect
 * to a server.
 *
 */
class MQTTConnectionManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: fenix.api.get('/mqtt/state/get'),
      servers: fenix.api.get('/mqtt/servers/get')
    };

    this.onMQTTState = this.onMQTTState.bind(this);
    this.onMQTTServers = this.onMQTTServers.bind(this);
  }

  /**
   * Listener for the '/mqtt/state' channel.
   *
   */
  onMQTTState(e, state) {
    let u = {
      state: state
    };

    this.setState(merge(this.state, u));
  }

  onMQTTServers(e, servers) {
    let u = {
      servers: servers
    };

    this.setState(merge(this.state, u));
  }

  /**
   *  Method called by React when the component did mount.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   * When MQTTConnectionManager has been mount, it registers its listeners for
   * MQTT state updates and asks for a refresh.
   *
   */
  componentDidMount() {
    fenix.api.on('/mqtt/state', this.onMQTTState);
    fenix.api.on('/mqtt/servers', this.onMQTTServers);
  }

  /**
   * Method called by React when the component will unmount.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   * Before MQTT will unmount, it removes its listeners from MQTT updates.
   *
   */
  componentWillUnmount() {
    fenix.api.removeListener('/mqtt/state', this.onMQTTState);
    fenix.api.removeListener('/mqtt/servers', this.onMQTTServers);
  }

  doConnect() {
    let host    = this.refs.mqttServerHost.value
      , scheme  = this.refs.mqttServerScheme.value;

    fenix.api.send('/mqtt/action/connect', scheme, host);
  }

  doDisconnect() {
    fenix.api.send('/mqtt/action/disconnect');
  }

  connectTo(serverName) {
    let server = this.state.servers[serverName];

    if (server) {
      fenix.api.send('/mqtt/action/connect', server.scheme, server.host);
    }

    this.refs.mqttServers.classList.remove('opened');
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

  openForm() {
    this.refs.addServer.openForm();
  }

  /**
   * Method called by React when rendering the component.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   *
   */
  render() {
    let icon = statusIcons[this.state.state.status];

    let toggler = () => {
      this.refs.mqttServers.classList.toggle('opened');
    };

    let serversComponents = [];

    let message = '';

    switch (this.state.state.status) {
      case 'connected':
        message = `Connected to ${this.state.state.uri.host}`;
        break;
      case 'connecting':
        message = `Trying to connect to ${this.state.state.uri.host}`;
        break;
      case 'disconnected':
        message = 'You are not connected';
        break;
      case 'error':
        message = `An error occured "${this.state.state.error}"`;
        break;
      default:
        message = '';
        break;
    }

    Object.keys(this.state.servers).forEach(name => {
      let server = this.state.servers[name]
        , action = this.connectTo.bind(this, name);

      serversComponents.push(
        <button className="mqtt-server" key={ server.name } onClick={ action }>
          <i className="fa fa-3x fa-server"></i>
          <div className="mqtt-server-name">{ server.name }</div>
        </button>
      );
    });

    return (
      <div className={ "mqtt-connection-manager " + this.state.state.status }>
        <div className="mqtt-status-bar">
          <span className="message"><i className={ "fa fa-lg fa-fw " + icon }></i> { message }</span>
          <button onClick={ toggler } className="toggler"><i className="fa fa-lg fa-caret-down"></i></button>
        </div>
        <div ref="mqttServers" className="mqtt-servers">
          { serversComponents }
          <button
            onClick={ this.openForm.bind(this) }
            className="mqtt-server mqtt-add-server">

            <i className="fa fa-3x fa-plus"></i>
            <div className="mqtt-server-name">new</div>
          </button>
          <MQTTConnectionManagerAddServer ref="addServer"/>
        </div>
      </div>
    );
  }
}

module.exports = MQTTConnectionManager;
