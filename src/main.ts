import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.use(
    cors({
      // origin: "http://localhost:5173",
      origin : true,
      Credential: true,
    })
  );
  await app.listen(3000);
  console.log("🚀 Server running on http://localhost:3000");
}
bootstrap();
