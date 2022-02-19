import { Environment } from "@common/typings"
import allConfigs = require("./electron-boilerplate-config.json")
import { isDev } from "./util/environment"

const environment: Environment = isDev ? "development" : "production"

export const appConfiguration = allConfigs[environment]

export interface AppConfiguration {
  readonly NODE_ENV: Environment
  readonly db: {
    readonly database: string
  }
  readonly app: {
    readonly name: string
  }
}
