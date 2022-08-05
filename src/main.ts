import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  app.listen(PORT || 3000, function(){
    console.log(`Express server listening on port ${PORT}`);
  });
}

bootstrap();
