import { app, BrowserWindow } from "electron"
import isDev from "electron-is-dev"
import { join } from "path"
import { format } from "url"
import { startElectronExpressServer } from "./api/electron-web"

console.log(`Electron app starting in ${isDev ? "development" : "production"} mode.`)

const createClientWindow = (): void => {
  const window = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  const url = isDev
    ? format({
        protocol: "http:",
        pathname: "localhost:3000",
        slashes: true,
      })
    : format({
        protocol: "file:",
        pathname: join(__dirname, "client", "index.html"),
        slashes: true,
      })

  window.loadURL(url)

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

  const url = format({
    protocol: "file:",
    pathname: join(__dirname, "index-nestjs.html"),
    slashes: true,
  })

  window.loadURL(url)

  window.webContents.openDevTools({
    mode: "detach",
  })
}

app.whenReady().then(() => {
  createClientWindow()
  startElectronExpressServer()
  if (!isDev) {
    createServerWindow()
  }

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
