import { ReviewDto } from '../dto/review.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../entity/review.entity';
import { checkUuid } from 'src/utils/uuid/uuid';
import { notFoundCode, NOT_FOUND } from 'src/constants/constants';
import { CommetnDto } from '../dto/comment.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async getAll() {
    return await this.reviewRepository.find();
  }

  async getPages() {
    const pages = Math.ceil((await this.reviewRepository.find()).length / 7);
    return pages;
  }

  async getPage(page: string) {
    const reviewPage = await this.reviewRepository.find();
    return reviewPage.slice((Number(page) - 1) * 7, (Number(page)) * 7)
  }

  async createReview(body: ReviewDto) {
    const createdReview = this.reviewRepository.create(body);
    const res = await this.reviewRepository.save(createdReview);
    return res;
  }

  async addComment (id: string, body: CommetnDto) {
    checkUuid(id);
    const review = await this.reviewRepository.findOne({ where: {id} });
    if (!review) {
      throw new HttpException('not found', 404);
    }
    return await this.reviewRepository.save({...review, ...body});
  }

  async removeReview(id: string) {
    checkUuid(id);
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, notFoundCode);
    }
  }
}
