import { Environment } from "@common/typings"
import applicationConfig = require("rc")

export const appConfiguration = applicationConfig("electron-boilerplate", {}) as unknown as AppConfiguration

export interface AppConfiguration {
  readonly NODE_ENV: Environment
  readonly db: {
    readonly database: string
  }
  readonly app: {
    readonly name: string
  }
}
