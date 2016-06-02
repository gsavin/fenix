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

class DBConnectionManagerAddServer extends ConnectionManager.AddServerComponent {
  doAddServer(e) {
    let server = {
      name: this.refs.serverName.value,
      host: this.refs.serverHost.value,
      scheme: this.refs.serverScheme.value,
      database: this.refs.database.value,
      username: this.refs.username.value,
      password: this.refs.password.value
    };

    fenix.api.send('/db/servers/add', server.name, server);

    e.preventDefault();
  }

  renderForm() {
    return (
      <form onSubmit={ this.doAddServer }>
        <h2>Add new server</h2>
        <div className="select-input-combo">
          <select ref="serverScheme">
            <option value="mongodb">mongodb://</option>
          </select>
          <input
            type="text"
            ref="serverHost"
            name="db-server-host"
            placeholder="Server host" />
        </div>
        <div>
          <input type="text" ref="database" placeholder="Database"/>
        </div>
        <div>
          <input type="text" ref="username" placeholder="Username"/>
          <input type="password" ref="password" placeholder="Password"/>
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

class DBConnectionManager extends ConnectionManager {
  constructor(props) {
    super(props, '/db');

    this.serverIcon = "fa-database";
  }

  getAddServerComponent() {
    return DBConnectionManagerAddServer;
  }
}

module.exports = DBConnectionManager;
