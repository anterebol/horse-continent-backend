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
  Delete,
} from '@nestjs/common';
import { CommetnDto } from '../dto/comment.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getReviews() {
    return await this.reviewService.getAll();
  }

  @Get('/pages')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getPagesREview() {
    return await this.reviewService.getPages();
  }

  @Get(':page')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async getReviewsPage(@Param('page') page: string) {
    return await this.reviewService.getPage(page);
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
  async addComment (@Body() commetnDto: CommetnDto, @Param('id') id: string) {
    return this.reviewService.addComment(id, commetnDto)
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeReview(@Param('id') id: string) {
    return this.reviewService.removeReview(id);
  }
}
