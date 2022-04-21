const data = window.api.getData
window.Bridge.send(data)
import applications from "./applications.json" assert { type: "json" }
import addGlobalEventListener from "./addGlobalEventListener.js"

const app_template = document.querySelector("#app-template")
const list_app = document.querySelector("[data-appconatiner]")

applications.forEach(renderApp)

function renderApp(app) {
  const appItem = app_template.content.cloneNode(true)
  if (app.bool === true) {
    return
  }
  const list = appItem.querySelector("[data-checkbox]")
  list.value = app.id
  const image = appItem.querySelector("[data-image]")
  image.src = `icon/${app.name}.png`
  const name = appItem.querySelector("[data-title]")
  name.innerText = `${app.name}`
  list_app.appendChild(appItem)
}

const getAppBtn = document.getElementById("getapp")
const addlibrary = document.getElementById("addlibrary")
const listapp = document.getElementById("list-app")

getAppBtn.addEventListener("click", (e) => {
  addlibrary.classList.toggle("hidden")
  listapp.classList.toggle("hidden")
})

addlibrary.addEventListener("click", (e) => {
  var inputElements = document.getElementsByTagName("input")
  for (var i = 0; i < inputElements.length; i++)
    if (inputElements[i].type == "checkbox")
      if (inputElements[i].checked) {
        window.electronAPI.sendcheckbox(JSON.stringify(inputElements[i].value))
      }
  window.location.reload()
})

const loadApp = document.getElementById("load-app")
const appLoader = document.querySelector("[data-show]")

applications.forEach((f) => {
  if (f.bool === true) {
    createGird(f)
  }
})

function createGird(item) {
  const appItem = loadApp.content.cloneNode(true)
  const img = appItem.querySelector("[data-loadImage]")
  img.src = `icon/${item.name}.png`
  const title = appItem.querySelector("[data-name]")
  title.innerText = `${item.name}`
  const btn = appItem.querySelector("[data-launchBtn]")
  // btn.id = item.id
  btn.dataset.id = item.id
  appLoader.appendChild(appItem)
}

addGlobalEventListener("click", "[data-launchBtn]", (e) => {
  const value = e.target.dataset.id
  applications.forEach((a) => {
    if (value === a.id) {
      if (a.args !== "") {
        const g = a.args.split(" ")
        const obj = { target: a.target, args: g }
        window.withargs.send(obj)
      } else {
        window.withoutargs.send(a)
      }
    }
  })
})
