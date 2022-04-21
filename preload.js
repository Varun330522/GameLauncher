const { loadApp } = require("./loadApp.js")
const { shell, contextBridge } = require("electron")
const { ipcRenderer } = require("electron/renderer")
const fs = require("fs-extra")
const uniqid = require("uniqid")

function listApp() {
  const app = loadApp()
  const shellObject = []
  app.forEach((a) => {
    try {
      let name = a.split("\\")
      let getlnk = name[name.length - 1] + " "
      let lnkName = getlnk.split(".")
      let appName = lnkName[0]
      shellObject.push({ shell: shell.readShortcutLink(a), name: appName })
    } catch (err) {}
  })
  return shellObject
}

const getdata = listApp()
const filterData = []
getdata.forEach((f) => {
  const g = f.shell.target
  if (g.includes(".exe")) {
    filterData.push({
      id: uniqid(),
      target: g,
      name: f.name,
      args: f.shell.args,
      bool: false,
    })
  }
})

const jsonContent = JSON.stringify(filterData)
fs.readJSON("applications.json", (err, obj) => {
  if (obj.name === jsonContent.name) {
    return
  } else {
    fs.writeFile("applications.json", jsonContent, (err) => {
      return err
    })
  }
})

const expose = {
  getData: filterData,
}
contextBridge.exposeInMainWorld("api", expose)

contextBridge.exposeInMainWorld("Bridge", {
  send: (send = (shell) => {
    ipcRenderer.send("gotlead", shell)
  }),
})

contextBridge.exposeInMainWorld("electronAPI", {
  sendcheckbox: (sendcheckbox = (checkedValue) => {
    ipcRenderer.send("getchecked", checkedValue)
  }),
})

contextBridge.exposeInMainWorld("withargs", {
  send: (send = (send) => {
    ipcRenderer.send("getargs", send)
  }),
})

contextBridge.exposeInMainWorld("withoutargs", {
  send: (send = (send) => {
    ipcRenderer.send("getwithoutargs", send)
  }),
})
