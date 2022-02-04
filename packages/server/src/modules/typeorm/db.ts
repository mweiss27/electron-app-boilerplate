import { Connection, createConnection } from "typeorm"
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions"
import { appConfiguration } from "../../app-configuration"

export const connectionOptions: SqliteConnectionOptions = {
  name: "connection",
  type: "sqlite",
  ...appConfiguration.db,
  entities: [],
  logging: false,
}

export const createDbConnection = (): Promise<Connection> => createConnection(connectionOptions)
