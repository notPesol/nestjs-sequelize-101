import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  // Use process.env.PORT to get the port from the environment variables
  const port = process.env.PORT || 5200;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
