import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '../core/http-exception.filter.';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(5000);
}
bootstrap();
