'use strict';

const mongoose = require('mongoose')
    , Schema   = mongoose.Schema;

/**
 * Schéma d'un jeu de données pour une unité de temps.
 */
var SensorDataSchema = new Schema({

  /**
   * L'étiquette temporelle, arrondie à l'unité de découpe.
   */
  timestamp: Date,

  /**
   * Valeurs du capteur, par unité de précision.
   */
  data: [Number],

  /**
   * Informations additionnelles sur ce jeu de données.
   */
  metadata: [{
    name: String,
    value: Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
