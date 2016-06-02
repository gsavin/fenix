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
    , fenix = require('../fenix-ui.js');

const statusIcons = {
  'connected':    'fa-plug',
  'connecting':   'fa-spin fa-cog',
  'disconnected': 'fa-ban'
};

class ConnectionManagerAddServer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };

    this.closeForm    = this.closeForm.bind(this);
    this.openForm     = this.openForm.bind(this);
    this.doAddServer  = this.doAddServer.bind(this);
  }

  openForm() {
    this.setState({
      opened: true
    });
  }

  closeForm() {
    this.setState({
      opened: false
    });
  }

  toggleForm() {
    this.setState({
      opened: !this.state.opened
    });
  }

  doAddServer() {
    // Abstract method
  }

  renderForm() {
    return null;
  }

  render() {
    return (
      <div className="connection-manager-add-server">
        <Modal
          isOpen={ this.state.opened }
          className="modal"
          overlayClassName="modal-overlay">
          <button onClick={ this.closeForm.bind(this) } className="close"><i className="fa fa-times-circle"></i></button>
          { this.renderForm() }
        </Modal>
      </div>
    );
  }
}

class ConnectionManager extends React.Component {
  constructor(props, prefix) {
    super(props);

    this.prefix = prefix;

    this.serverIcon = "fa-server";

    this.state = {
      state:    fenix.api.get(prefix + '/state/get'),
      servers:  fenix.api.get(prefix + '/servers/get')
    };

    this.onState = this.onState.bind(this);
    this.onServers = this.onServers.bind(this);
    this.openAddServerForm = this.openAddServerForm.bind(this);
  }

  /**
   * Listener for the '/mqtt/state' channel.
   *
   */
  onState(e, state) {
    let u = {
      state: state
    };

    this.setState(merge(this.state, u));
  }

  onServers(e, servers) {
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
    fenix.api.on(this.prefix + '/state', this.onState);
    fenix.api.on(this.prefix + '/servers', this.onServers);
  }

  /**
   * Method called by React when the component will unmount.
   *
   * More informations about component lifecycle are available [here](https://facebook.github.io/react/docs/component-specs.html).
   * Before MQTT will unmount, it removes its listeners from MQTT updates.
   *
   */
  componentWillUnmount() {
    fenix.api.removeListener(this.prefix + '/state', this.onState);
    fenix.api.removeListener(this.prefix + '/servers', this.onServers);
  }

  getConnectionMessage() {
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

    return message;
  }

  doDisconnect() {
    fenix.api.send(this.prefix + '/action/disconnect');
  }

  connectTo(serverName) {
    let server = this.state.servers[serverName];

    if (server) {
      fenix.api.send(this.prefix + '/action/connect', server);
    }

    this.refs.servers.classList.remove('opened');
  }

  static get AddServerComponent() {
    return ConnectionManagerAddServer;
  }

  getAddServerComponent() {
    return this.AddServerComponent;
  }

  openAddServerForm() {
    this.refs.addServer.openForm();
  }

  renderServerComponent(server, action) {
    return (
      <button className="server" key={ server.name } onClick={ action }>
        <i className={ "fa fa-3x " + this.serverIcon }></i>
        <div className="server-name">{ server.name }</div>
      </button>
    );
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
      this.refs.servers.classList.toggle('opened');
    };

    let serversComponents = [];
    let message = this.getConnectionMessage();
    let AddServer = this.getAddServerComponent();

    Object.keys(this.state.servers).forEach(name => {
      let server = this.state.servers[name]
        , action = this.connectTo.bind(this, name);

      serversComponents.push(this.renderServerComponent(server, action));
    });

    return (
      <div className={ "connection-manager " + this.state.state.status }>
        <div className="status-bar">
          <span className="message"><i className={ "fa fa-lg fa-fw " + icon }></i> { message }</span>
          <button onClick={ toggler } className="toggler"><i className="fa fa-lg fa-caret-down"></i></button>
        </div>
        <div ref="servers" className={ "servers" + (this.state.state.status == 'disconnected' ? ' opened' : '') }>
          { serversComponents }
          <button
            onClick={ this.openAddServerForm }
            className="server add-server">

            <i className="fa fa-3x fa-plus"></i>
            <div className="server-name">new</div>
          </button>
          <AddServer ref="addServer"/>
        </div>
      </div>
    );
  }
}

module.exports = ConnectionManager;
