const electron = require('electron');
const {app, BrowserWindow, Menu,dialog, shell,Notification,ipcMain, ipcRenderer} = require('electron')
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
  const version = app.getVersion();
  template.unshift({
    label: name,
    submenu: [
      {
      label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About',
              message: 'todo is built by Sujit Roy',
              detail: 'You can find me on GitHub @nextentrepreneur',
            });
          }
        },
        {
          label: 'ToDo (v' + version + ')',
          click: () => {
            shell.openExternal('https://github.com/nextentrepreneur/todo');
          }
        },
      {
        label: 'Quit',
        accelerator: 'Ctrl+Q',
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
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
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
  sendStatusToWindow('Update downloaded.');
});


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

//-------------------------------------------------------------------
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------
app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});
