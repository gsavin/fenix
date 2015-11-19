
# Vue d'ensemble

Fenix vise à manipuler les données de capteurs situés dans un bâtiment afin d'en permettre l'analyse. Celle-ci est effectuée sur un ensemble de capteurs. L'utilisateur accède donc à un ensemble existant de capteurs, ou a la possibilité d'en créer un nouveau. Un ensemble d'outil d'analyse est alors proposé, qui permettront de calculer des nouvelles informations au fur et à mesure de la réception des données.

# Modèles

## Capteurs

Le premier modèle disponible, `SensorData`, concerne le stockage des données d'un capteur. Celles-ci sont regroupées par unité de temps : il est par exemple possible de regrouper les valeurs d'un capteur par minute, chaque jeu de données comportera alors _60*f_ où _f_ est la fréquence d'emission du capteur.

Le second, `Sensor`, modèlise le capteur en soi. Il référencera l'ensemble des jeux de données disponibles pour ce capteur, ainsi que les informations propres au capteur comme son identifiant ou des métadonnées.
