import { app, BrowserWindow } from "electron"
import isDev from "electron-is-dev"
import { join } from "path"
import { startElectronExpressServer } from "./api/electron-web"

const createClientWindow = (): void => {
  const window = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  window.loadURL(isDev ? "http://localhost:3000" : `file://${join(__dirname, "../build/index.html")}`)

  if (isDev) {
    window.webContents.openDevTools({
      mode: "detach",
    })
  }
}

app.whenReady().then(() => {
  createClientWindow()
  startElectronExpressServer()

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
