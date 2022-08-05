import { ReviewService } from '../service/review.service';
import { ReviewDto } from '../dto/review.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
} from '@nestjs/common';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getReviews() {
    return await this.reviewService.getAll();
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async addReview(@Body() reviewDto: ReviewDto) {
    return await this.reviewService.createReview(reviewDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateReview(@Body() updateDto: ReviewDto, @Param('id') id: string) {
    return this.reviewService.updateReview(id, updateDto)
  }
}
