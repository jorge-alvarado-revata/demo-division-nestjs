import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API de Division')
    .setDescription('Esta es una API para manipular divisiones')
    .setVersion('1.0')
    .addTag('divisiones')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) => {
        const errors = validationErrors.map((err) => ({
          field: err.property,
          messages: Object.values(err.constraints ? err.constraints : []),
        }));
        return new BadRequestException(errors);
      },
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
