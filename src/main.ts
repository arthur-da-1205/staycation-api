import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handlebars } from '@libraries/handlebars/adapter.helper';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.setViewEngine({
    engine: { handlebars },
    templates: join(__dirname, '..', 'template'),
  });

  await app.listen(3001);
}
bootstrap();
