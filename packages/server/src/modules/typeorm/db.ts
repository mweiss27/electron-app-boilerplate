import { Connection, createConnection } from "typeorm"
import { BetterSqlite3ConnectionOptions } from "typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions"
import { appConfiguration } from "../../app-configuration"

export const connectionOptions: BetterSqlite3ConnectionOptions = {
  name: "connection",
  type: "better-sqlite3",
  ...appConfiguration.db,
  entities: [],
  logging: false,
}

export const createDbConnection = (): Promise<Connection> => createConnection(connectionOptions)
