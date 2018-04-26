
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import * as config from 'config';
import { INestApplication } from '@nestjs/common';
import { SwaggerBaseConfig, SwaggerDocument } from '@nestjs/swagger/interfaces';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(ApplicationModule);
  const { port }: Config['appConfig'] = config.get('appConfig');

  const options: SwaggerBaseConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();

  const document: SwaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(port);
}
bootstrap();
