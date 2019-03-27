// populate process.env with variables from .env file
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { handleCors } from './commons/middlewares/handle-cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(handleCors);
  app.use(session({
    secret: 'Ultimate/Secret',
    saveUninitialized: true,
    resave: true,
    name: 'sessionId',
    cookie: {
      httpOnly: true
    }
  }));
  await app.listen(process.env.API_PORT);
}
bootstrap();
