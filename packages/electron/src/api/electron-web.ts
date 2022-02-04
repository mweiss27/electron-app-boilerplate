import { ElectronRoutes, Ports } from "@common/api-clients"
import { GetSystemInfoResponse } from "@common/typings"
import cors from "cors"
import { app } from "electron"
import express from "express"
import * as http from "http"

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

  const server = http.createServer(expressApp)
  server.listen(Ports.Electron, "0.0.0.0", () => {
    console.log(`Electron server running on port ${Ports.Electron}`)
  })
}
