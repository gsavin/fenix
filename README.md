# FENIX

![](docs/logo-sm.png)

## What is Fenix ?

It aims to be a platform to monitor and analyze in real-time data coming from sensor of various kinds. It is mainly based on the [MQTT](http://mqtt.org) protocol.

The application is built upon [Electron](http://electron.atom.io/) allowing to build desktop application as html/javascript app.

The project is being developped inside the RI2C team of the [LITIS computer science laboratory](http://www.litislab.fr) at the [university of Le Havre](http://www.univ-lehavre.fr).

## How to build and run Fenix ?

Fenix is run through [nodejs](https://nodejs.org/), so you have to get node and its packet manager, npm, on your machine. When building Fenix for the first time, you need to download all node packages needed by the app. You can do that running the install command of npm from the root directory of Fenix :

```
npm install
```

Next step is to build the UI part. This can be done with the following command :

```
npm run build
```

Finally, Fenix can be started with the start action of npm :

```
npm start
```


## Licence

Fenix is a free software distributed under the BSD-like [CeCILL-B](http://www.cecill.info) licence.
