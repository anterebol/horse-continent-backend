import { EventEntity } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [TypeOrmModule.forFeature([EventEntity])]
})
export class EventModule {}
