import { GalleryDto } from './dto/gallery.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryEntity } from './gallery.entity';
import { checkUuid } from 'src/utils/uuid/uuid';
import { notFoundCode, NOT_FOUND } from 'src/constants/constants';

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
    const img = this.galleryRepository.create(galleryDto);
    return await this.galleryRepository.save(img);
  }
  async removeImage(id: string) {
    checkUuid(id);
    const event = await this.galleryRepository.findOne({ where: { id }});
    const result = await this.galleryRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, notFoundCode);
    } return id;
  }
}
