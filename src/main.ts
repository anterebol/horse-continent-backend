import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  app.use(cors({
    origin: '*'
  }))
  app.listen(PORT || 4000, function(){
    console.log(`Server listening on port ${PORT}`);
  });
}
bootstrap();

