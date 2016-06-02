import Router5 from 'router5';
import listenersPlugin from 'router5-listeners';

const router = new Router5()
  //
  // Options
  //
  .setOption('useHash', true)
  .setOption('defaultRoute', 'home')
  //
  // Routes
  //
  .addNode('home',        '/')
  .addNode('mqtt',        '/mqtt')
  .addNode('mqtt.sensor', '/sensor/:sensor')
  .addNode('db',          '/db')
  .addNode('analyze',     '/analyze')
  //
  // Plugins
  //
  .usePlugin(listenersPlugin());

module.exports = router;
