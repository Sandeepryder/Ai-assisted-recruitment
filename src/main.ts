import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // app.setGlobalPrefix('api');

  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
