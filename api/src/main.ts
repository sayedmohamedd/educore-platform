/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('EduCore API')
    .setDescription('EduCore SaaS API Documentation')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  // app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
