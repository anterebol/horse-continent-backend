import { Module } from '@nestjs/common';
import { ReviewModule } from './modules/review/module/review.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UserModule } from './modules/user/user.module';
import { MainModule } from './modules/main/main.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      url: process.env.TYPEORM_URL,
      port: 5432,
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    ReviewModule,
    AuthModule,
    UserModule,
    MainModule,
    EventModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
