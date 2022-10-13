import { GalleryDto } from './dto/gallery.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryEntity } from './gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private galleryRepository: Repository<GalleryEntity>
  ){}
  async getAll() {
    return await this.galleryRepository.find();
  }
  async addImage(galleryDto: GalleryDto) {
    return await this.galleryRepository.save(galleryDto);
  }
}
