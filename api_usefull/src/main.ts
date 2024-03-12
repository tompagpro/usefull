import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  if (process.env.NODE_ENV === 'production') {
    // Configurations spécifiques à la production
    console.log('Env: ', process.env.NODE_ENV);
  } else {
    // Configurations spécifiques au développement
    console.log('Env: ', process.env.NODE_ENV);
  }
  await app.listen(process.env.PORT ? +process.env.PORT : 3000);
}
bootstrap();
