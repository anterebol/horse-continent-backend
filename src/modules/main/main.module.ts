import { forwardRef, Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MainController],
  imports: [forwardRef(() => AuthModule),]
})
export class MainModule {}
