import fetch from "cross-fetch"
import "reflect-metadata"
import { Environment, GetSystemInfoResponse } from "../typings"
import { Ports } from "./ports"
import { ElectronRoutes } from "./routes"

export interface IElectronClient {
  getSystemInfo(): Promise<GetSystemInfoResponse>
}

export class ElectronClient implements IElectronClient {
  private generateUrl = (endpoint: string): string => `http://localhost:${Ports.Electron}${endpoint}`

  public async getSystemInfo(): Promise<GetSystemInfoResponse> {
    const result = await fetch(this.generateUrl(ElectronRoutes.GetSystemInfo)).then(response => response.json())

    return result as GetSystemInfoResponse
  }

  public async getEnvironment(): Promise<Environment> {
    const result = await fetch(this.generateUrl(ElectronRoutes.GetEnvironment)).then(response => response.text())

    return result as Environment
  }
}
