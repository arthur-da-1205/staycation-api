import { handlebars } from '@libraries/handlebars/adapter.library';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';
import multer from 'fastify-multer';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Register fastify-file-upload plugin
  app.register(multer.contentParser as any);

  app.enableCors({ origin: 'http://localhost:5001' });

  app.setViewEngine({
    engine: { handlebars },
    templates: join(__dirname, '..', 'template'),
  });

  await app.listen(3001);
}
bootstrap();
