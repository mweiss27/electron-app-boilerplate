import "reflect-metadata"
import { Routes, ServerRoutes } from "./routes"
import { ServerClientBase } from "./server-client-base"

export interface IPingClient {
  ping(): Promise<string>
}

export class PingClient extends ServerClientBase implements IPingClient {
  constructor() {
    super(ServerRoutes.PingController)
  }

  public async ping(): Promise<string> {
    const response = await this.getRaw(Routes.Index)

    return response
  }
}
