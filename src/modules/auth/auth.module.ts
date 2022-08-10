import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env.TOKEN_EXPIRE_TIME);
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
