import { ElectronRoutes, Ports } from "@common/api-clients"
import { Environment, GetSystemInfoResponse } from "@common/typings"
import cors from "cors"
import { app } from "electron"
import express from "express"
import * as http from "http"
import isDev from "electron-is-dev"

const expressApp = express()

export const startElectronExpressServer = (): void => {
  expressApp.use(cors())

  expressApp.get(ElectronRoutes.GetSystemInfo, async (_, res): Promise<void> => {
    const userDataPath = app.getPath("userData")

    const response: GetSystemInfoResponse = {
      userDataPath,
    }

    res.json(response)
  })

  expressApp.get(ElectronRoutes.GetEnvironment, async (_, res): Promise<void> => {
    const environment: Environment = isDev ? "development" : "production"
    res.send(environment)
  })

  const server = http.createServer(expressApp)
  server.listen(Ports.Electron, "0.0.0.0", () => {
    console.log(`Electron server running on port ${Ports.Electron}`)
  })
}
