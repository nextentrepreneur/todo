const electron = require('electron');
const {app, BrowserWindow, Menu, Notification,ipcMain, ipcRenderer} = require('electron')
const log = require('electron-log');
const{ autoUpdater } = require("electron-updater");

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');


//Logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file,level = 'info';
log.info('Todo starting...');

//-------------------------------------------------------------------
// Define the menu
//
//-------------------------------------------------------------------
let template = []
if (process.platform === 'win32') {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about',
        click: function() {
          alert("Todo version",app.getVersion());
        }
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}


// Keep a global reference of the window object, if don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({height: 680, width: 1000, minHeight: 680, minWidth: 1000});
//  mainWindow.webContents.openDevTools();

  //Load the index.html here of the todo
//  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.loadURL('https://nextentrepreneur.github.io/todo/');
  mainWindow.on('closed', () => mainWindow = null);
}

function sendStatusToWindow(text){
  log.info(text);
  mainWindow.webContents.send('message',text);
}

//-------------------------------------------------
// AutoUpdating
//-------------------------------------------------
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for updates...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update-not-available');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error updating.' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let speed = ((progressObj.bytesPerSecond / 1000) / 1000).toFixed(1);
  let transferred = ((progressObj.transferred / 1000) / 1000).toFixed(1);
  let total = ((progressObj.total / 1000) / 1000).toFixed(1);
  let percent = progressObj.percent.toFixed(1);

  let log_message = "Download speed: " + speed + " Mb/s";
  log_message = log_message + ' - Downloaded: ' + percent + '%';
  log_message = log_message + ' (' + transferred + "/" + total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded, it will be installed in 5 seconds.');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready',  function() {
  // Create the Menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'win32') {
    app.quit();
  }
});

app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});
