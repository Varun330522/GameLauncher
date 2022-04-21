const fs = require("fs")
const path = require("path")

let file = []
let lnk = []
const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })
  return arrayOfFiles
}

function loadApp() {
  getAllFiles("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs", file)
  file.find((fl) => {
    if (fl.includes(".lnk")) {
      lnk.push(fl)
    }
  })
  // console.log(lnk)

  lnk = lnk.map((l) => {
    return l.replace(/\\/gi, "\\")
  })

  return lnk
}

// const a = loadApp()
// console.log(a)

module.exports = { loadApp }
