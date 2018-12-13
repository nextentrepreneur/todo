const electron = require('electron');
const{ autoUpdater } = require("electron-updater");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // trigger autoUpdate check
  autoUpdater.checkForUpdates();
  mainWindow = new BrowserWindow({height: 680, width: 1000, minHeight: 680, minWidth: 1000});
//  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.loadURL('https://nextentrepreneur.github.io/todo/');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

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

//-----------------------------------------------------------------------
// Auto updates
//-----------------------------------------------------------------------

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