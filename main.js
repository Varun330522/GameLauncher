const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

ipcMain.on('asynchronous-message', (event, arg) => {
  var child = require('child_process').execFile
  var executablePath = 'C:\\Riot Games\\Riot Client\\RiotClientServices.exe'
  var execArguments = ['--launch-product=valorant', '--launch-patchline=live']
  child(executablePath, execArguments, function (err, data) {
    if (err) {
      console.error(err)
      return
    }

    console.log(data.toString())
  })
})

ipcMain.on('asynchronousa-message', (event, arg) => {
  var child = require('child_process').execFile
  var executablePath = 'C:\\Riot Games\\Riot Client\\RiotClientServices.exe'
  var execArguments = [
    '--launch-product=league_of_legends',
    '--launch-patchline=live',
  ]
  child(executablePath, execArguments, function (err, data) {
    if (err) {
      console.error(err)
      return
    }

    console.log(data.toString())
  })
})

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html')
  LaunchExe()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function LaunchExe() {
  var child = require('child_process').execFile
  var executablePath = ''
  var parameters = ['Hai', 'Test', 'Dat']
  child(executablePath, parameters, function (err, data) {
    console.log(err)
    console.log(data.toString())
  })
}
