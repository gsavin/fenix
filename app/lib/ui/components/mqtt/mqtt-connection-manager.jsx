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

const React             = require('react')
    , Modal             = require('react-modal')
    , merge             = require('lodash').merge
    , fenix             = require('../../fenix-ui.js')
    , ConnectionManager = require('../connection-manager.jsx');

class MQTTConnectionManagerAddServer extends ConnectionManager.AddServerComponent {
  constructor(props) {
    super(props);
    this.doAddServer  = this.doAddServer.bind(this);
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

  renderForm() {
    return (
      <form onSubmit={ this.doAddServer }>
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
          <button role="submit">Add server</button>
        </div>
      </form>
    );
  }
}

/**
 * MQTT connection manager component.
 *
 * It allows to display the current state of the MQTT connection and to connect
 * to a server.
 *
 */
class MQTTConnectionManager extends ConnectionManager {
  constructor(props) {
    super(props, '/mqtt');
  }

  getAddServerComponent() {
    return MQTTConnectionManagerAddServer;
  }
}

module.exports = MQTTConnectionManager;
