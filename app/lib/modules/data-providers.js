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

const EventEmitter = require('events');

class DataProvider {
  constructor(source) {
    this._source = source;
  }

  get source() {
    return this._source;
  }

  *data() {

  }
}

class DataProvidersModule extends EventEmitter {
  static get DataProvider() {
    return DataProvider;
  }

  constructor() {
    /*
     * Do not forget to call the super constructor !
     * Otherwise, it will crash.
     */
    super();

    this._providers = [];
  }

  init() {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }

  get name() {
    return "data-providers";
  }

  get priority() {
    return 10;
  }

  register(dataProvider) {

  }

  unregister(dataProvider) {

  }
};

module.exports = new SensorsModule();
