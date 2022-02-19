import { Controller, Get } from "@nestjs/common"
import { isDev } from "../../util/environment"

@Controller("ping")
export class PingController {
  @Get()
  public ping(): string {
    return `pong - ${isDev ? "development" : "production"}`
  }
}
