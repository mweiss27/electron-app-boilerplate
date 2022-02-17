import { Ports } from "@common/api-clients"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app-module"

const whitelistedOrigins = ["http://localhost:8080", "http://localhost:3000", "http://localhost:3001"]

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: (origin, cb) => {
      cb(null, whitelistedOrigins.includes(origin) ? origin : undefined)
    },
    credentials: true,
  })
  await app.listen(Ports.Server)
}

bootstrap()
