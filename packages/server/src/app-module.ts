import { Module, ModuleMetadata } from "@nestjs/common"
import { TypeORMModule } from "./modules/typeorm/typeorm-module"

const imports: ModuleMetadata["imports"] = [TypeORMModule]

@Module({
  imports,
  controllers: [],
})
export class AppModule {}
