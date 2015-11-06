'use strict';

var fenix = require('./lib/fenix.js');

try {
  fenix.loadDb();
} catch(e) {
  console.log(e);
}

var app = require('app')
  , BrowserWindow = require('browser-window')
  , dialog = require('dialog');

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
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/views/main.html');

  mainWindow.on('closed', function() {
    //
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    //
    mainWindow = null;
  });
});
