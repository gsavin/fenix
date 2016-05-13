/**
 * @author Guilhelm Savin
 * @module config
 */
'use strict';

var _ = require('lodash');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log("Fenix running on electron v" + process.versions.electron);
console.log('ENV is set to', process.env.NODE_ENV);

/**
 * Load environment configuration
 */
module.exports = _.merge(
    require('./all.js'),
    require('./' + process.env.NODE_ENV + '.js')
);
