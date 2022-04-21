const { app, BrowserWindow, ipcMain } = require("electron")
const fs = require("fs-extra")
const path = require("path")
var iconExtractor = require("icon-extractor")

function handleCheckedFile(checkedValue) {
  return checkedValue
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile("index.html")
}
app.whenReady().then(() => {
  ipcMain.on("getchecked", (event, checkedValue) => {
    const incomingData = checkedValue
    // console.error(incomingData)
    let rawdata = fs.readFileSync("applications.json")
    let appData = JSON.parse(rawdata)
    // console.error(appData)
    appData.forEach((f) => {
      if (JSON.stringify(f.id) === incomingData) {
        f.bool = true
      }
    })
    const changedData = JSON.stringify(appData)
    fs.writeFile("applications.json", changedData, (err) => {
      // console.log(err)
    })
  })

  ipcMain.on("getargs", (event, send) => {
    var child = require("child_process").execFile
    const target = send.target
    const args = send.args
    console.error(args)
    child(target, args, (err, data) => {
      console.error(err)
    })
  })
  ipcMain.on("getwithoutargs", (event, send) => {
    var child = require("child_process").execFile
    const target = send.target
    child(target, (err, data) => {
      console.error(err)
    })
  })
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.once("gotlead", (event, shell) => {
  iconExtractor.emitter.on("icon", function (data) {
    var buf = new Buffer.from(data.Base64ImageData, "base64")
    fs.writeFileSync(`icon/${data.Context}.png`, buf)
  })
  shell.forEach((s) => {
    const sd = s.target
    iconExtractor.getIcon(s.name, sd)
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
