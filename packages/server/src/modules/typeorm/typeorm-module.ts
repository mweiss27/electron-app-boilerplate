import { Global, Module, Provider } from "@nestjs/common"
import { Connection } from "typeorm"
import { DataProvider } from "./data-provider"
import { createDbConnection } from "./db"

export const DATABASE_CONNECTION = "DATABASE_CONNECTION"

const typeOrmProviders: ReadonlyArray<Provider> = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<Connection> => await createDbConnection(),
  },
]

@Global()
@Module({
  providers: [...typeOrmProviders, DataProvider],
  exports: [...typeOrmProviders, DataProvider],
})
export class TypeORMModule {}
