import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const PORT = process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || 4000, () => console.log(`Server work at ${PORT}`));
}
bootstrap();
