const electron = require('electron');
const {app, BrowserWindow, Notification,ipcMain, ipcRenderer} = require('electron')
const log = require('electron-log');
const{ autoUpdater } = require("electron-updater");

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');


//Logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file,level = 'info';
log.info('Todo starting...');

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
  sendStatusToWindow('Error updating.');
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

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'win32') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on('update-downloaded', (info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  },5000)
})

app.on('ready', function()  {
  autoUpdater.checkForUpdates();
});

//-----------------------------------------------------------------------
// Auto updates
//-----------------------------------------------------------------------
/*
    autoUpdater.on('checking-for-update', () => {
    console.log("Checking for update...");
   });
    
   autoUpdater.on('update-available', (info) => {
    console.log("Update available.");
   });
    
   autoUpdater.on('update-not-available', (info) => {
    console.log("Update not availabe.");
   });
  
   autoUpdater.on('error', (err) => {
     console.log('Error in auto-updater');
   });
  
   autoUpdater.on('download-progress', (progressObj) => {
     console.log(`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.parcent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`);
   });
  
   autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded; will install in now')
  });

   autoUpdater.on('update-downloaded', (info) => {
      autoUpdater.quitAndInstall();
 });
 */