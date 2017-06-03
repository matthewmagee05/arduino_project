const { app, BrowserWindow, session } = require('electron');
const pug = require('electron-pug')({ pretty: true });
const storage = require('electron-json-storage');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 600, height: 800 });

  mainWindow.loadURL(`file://${__dirname}/app//views/index.pug`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
