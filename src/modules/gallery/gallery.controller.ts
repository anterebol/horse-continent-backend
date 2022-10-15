import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
  addGalleryImg(@Body() addDto: GalleryDto) {
    return this.galleryService.addImage(addDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  addEvent(@Param('id') id: string) {
    return this.galleryService.removeImage(id);
  }
}
