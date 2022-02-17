import { Module, ModuleMetadata } from "@nestjs/common"
import { PingModule } from "./modules/ping/ping-module"
import { TypeORMModule } from "./modules/typeorm/typeorm-module"

const imports: ModuleMetadata["imports"] = [TypeORMModule, PingModule]

@Module({
  imports,
  controllers: [],
})
export class AppModule {}
