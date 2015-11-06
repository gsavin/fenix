/**
 * @author Guilhelm Savin
 * @module config
 */
'use strict';

var _ = require('lodash');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('env is set to', process.env.NODE_ENV);

/**
 * Load environment configuration
 */
module.exports = _.merge(
    require('./config/all.js'),
    require('./config/' + process.env.NODE_ENV + '.js')
);
