console.log('from preload.js')
const fetchInstalledSoftware = require('fetch-installed-software')
window.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron')
  ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
  })
  //button and its event listener
  const valorant = document.getElementById('valorant')
  valorant.addEventListener('click', () => {
    ipcRenderer.send('asynchronous-message', 'ping')
  })
  const lol = document.getElementById('lol')
  lol.addEventListener('click', () => {
    ipcRenderer.send('asynchronousa-message', 'ping')
  })
})
