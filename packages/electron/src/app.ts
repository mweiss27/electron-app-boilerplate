import { app, BrowserWindow } from "electron"
// import isDev from "electron-is-dev"
import { join } from "path"
import { startElectronExpressServer } from "./api/electron-web"

const isDev = false

const createClientWindow = (): void => {
  const window = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  const prodIndexFile = `file://${join(__dirname, "../client/index.html")}`
  console.log(`Loading prod index.html at: `, prodIndexFile)

  window.loadURL(isDev ? "http://localhost:3000" : prodIndexFile)

  // if (isDev) {
  window.webContents.openDevTools({
    mode: "detach",
  })
  // }
}

const createServerWindow = (): void => {
  const window = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  const prodIndexFile = `file://${join(__dirname, "./index-nestjs.html")}`
  console.log(`Loading prod NestJS index.html at: `, prodIndexFile)

  window.loadURL(prodIndexFile)

  window.webContents.openDevTools({
    mode: "detach",
  })
}

app.whenReady().then(() => {
  createClientWindow()
  startElectronExpressServer()
  // if (!isDev) {
    createServerWindow()
  // }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createClientWindow()
    }
  })

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit()
    }
  })
})
