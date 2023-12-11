import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description } from './swagger/description.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appLogger = new Logger('tasks-management-app');

  const configDocument = new DocumentBuilder()
    .setTitle('Account Management API')
    .setDescription(description)
    .setBasePath('api/docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = process.env.APP_PORT || 3000;
  await app.listen(port).then(() => {
    appLogger.log(`Http server listening at port: ${port}`);
  });
}
bootstrap();
