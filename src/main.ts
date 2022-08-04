import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  // const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.listen(process.env.PORT || 3000, function(){
    console.log(`Express server listening on port ${process.env.PORT}`);
  });
}
bootstrap();
