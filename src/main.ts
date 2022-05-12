import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function createSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Api basic sample')
    .setDescription('A basic api created with nest framework')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwagger(app);
  await app.listen(3000);
}
bootstrap();
