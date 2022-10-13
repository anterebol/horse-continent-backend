import { GalleryEntity } from './gallery.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  providers: [GalleryService],
  controllers: [GalleryController],
  imports: [TypeOrmModule.forFeature([GalleryEntity])]
})
export class GalleryModule {}
