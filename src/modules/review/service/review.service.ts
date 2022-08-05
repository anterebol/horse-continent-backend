import { ReviewDto } from '../dto/review.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../entity/review.entity';
import { checkUuid } from 'src/utils/uuid/uuid';
import { errCode, NOT_FOUND } from 'src/constants/constants';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async getAll() {
    return await this.reviewRepository.find();
  }

  async createReview(body: ReviewDto) {
    const createdReview = this.reviewRepository.create(body);
    const res = await this.reviewRepository.save(createdReview);
    return res;
  }

  async updateReview(id: string, body: ReviewDto) {
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
      throw new HttpException(NOT_FOUND, errCode);
    }
  }
}
