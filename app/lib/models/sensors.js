/**
 * Définition des modèles de collections concernant les sites.
 *
 * Un site est divisé en un ensemble de secteurs. Chacun de ces secteurs
 * possède un ensemble de capteurs. Le site possède un attribute `geodata`
 * permettant de stocker la forme géographique associée au site. De même,
 * un secteur et un capteur possèdent eux aussi un attribut de forme. La forme
 * d'un secteur devra être représentée par un polygone, tandis que celle du
 * capteur ne sera qu'un simple point. Pour ces trois éléments, le format de
 * représentation est le (GeoJSON)[http://geojson.org/].
 *
 * Le point important du modèle est le stockage des données des capteurs. Nous
 * allons tirer avantage ici de fait que nous utilisons une base de données NOSQL.
 * Des informations et explications sur ces avantages sont détaillés ici :
 * http://blog.mongodb.org/post/65517193370/schema-design-for-time-series-data-in-mongodb
 *
 * Plutôt que de stocker les données en ligne, chaque ligne incluant une date et une
 * valeur, nous allons créer un document pour une fenêtre temporelle. Par exemple,
 * nous pouvons créer un document représentant les valeurs d'une minute. Ce
 * document comportera alors un tableau de 60 éléments (en considérant que le
 * capteur émet un événement par seconde, mais cette fréquence sera paramétrable)
 * chacune des entrées du tableau représentant la valeur du capteur à la seconde
 * correspondante.
 *
 * On parlera _d'unité de découpe_ pour désigner la distance temporelle entre
 * deux documents successifs, et _d'unité de précision_ la distance temporelle
 * entre deux événements. Pour l'exemple ci-dessus, l'unité de découpe est la
 * minute, tandis que l'unité de précision est la seconde.
 *
 * @author Guilhelm Savin
 * @module server/models
 */
'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

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
  data: [{
    value: Number,
    validity: Number
  }],

  /**
   * Informations additionnelles sur ce jeu de données.
   */
  metadata: [{
    name: String,
    value: Schema.Types.Mixed
  }]
});

mongoose.model('SensorData', SensorDataSchema);

var SensorSchema = new Schema({
  identifiant: {
    type:     String,
    unique:   true,
    required: true,
    index:    true
  },
  data: [SensorDataSchema],
  metadata: [{
   name: String,
   value: Schema.Types.Mixed
  }]
});

mongoose.model('Sensor', SensorSchema);

var SensorSetSchema = new Schema({
  identifiant: {
      type:     String,
      unique:   true,
      required: true,
      index:    true
  },

  sensors: [SensorSchema],

  metadata: [{
   name: String,
   value: Schema.Types.Mixed
  }]
});

mongoose.model('SensorSet', SensorSetSchema);
