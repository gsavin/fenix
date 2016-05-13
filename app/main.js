'use strict';

const app           = require('electron').app
    , BrowserWindow = require('electron').BrowserWindow
    , fenix         = require('./lib/fenix.js');

//
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//
var mainWindow = null;

//
// Quit when all windows are closed.
//
app.on('window-all-closed', function() {
  //
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  /*var menu = require('./lib/controllers/menu.js');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720
  });

  mainWindow.loadUrl('file://' + __dirname + '/default.html');
  mainWindow.setMenu(menu);

  mainWindow.on('closed', function() {
    //
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    //
    mainWindow = null;
  });*/
  fenix.init();
});
