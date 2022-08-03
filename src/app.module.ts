import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/module/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    UserModule,
  ],
})
export class AppModule {}
