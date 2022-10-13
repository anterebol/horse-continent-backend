import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GalleryDto } from './dto/gallery.dto';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.galleryService.getAll();
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addEvent(@Body() addDto: GalleryDto) {
    console.log(addDto)
    return this.galleryService.addImage(addDto);
  }
}
