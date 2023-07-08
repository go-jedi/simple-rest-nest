import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT: number | string = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Настройка документации Swagger
  const config = new DocumentBuilder()
    .setTitle('My simple rest api on NestJS')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('rob-bender')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
