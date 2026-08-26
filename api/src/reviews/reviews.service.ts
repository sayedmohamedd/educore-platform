import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto } from './dtos/create-review.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { UpdateReviewDto } from './dtos/update-review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.review.findMany();
  }

  async create(userId: string, dto: CreateReviewDto) {
    // check if course is exsits
    const course = await this.prisma.course.findUnique({
      where: {
        id: dto.courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // check if user is enrolled in the course
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: dto.courseId,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    // create review
    const review = await this.prisma.review.create({
      data: {
        userId,
        ...dto,
      },
    });

    return new ApiResponse(true, 'Review created successfully', review);
  }

  async update(userId: string, reviewId: string, dto: UpdateReviewDto) {
    // check if review exists and belongs to user
    await this.getReview(userId, reviewId);

    // update review
    const updatedReview = await this.prisma.review.update({
      where: { id: reviewId },
      data: dto,
    });

    return new ApiResponse(true, 'Review updated successfully', updatedReview);
  }

  async delete(userId: string, reviewId: string) {
    // check if review exists and belongs to user
    await this.getReview(userId, reviewId);

    await this.prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return new ApiResponse(true, 'Review deleted successfully');
  }

  private async getReview(userId: string, reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) throw new NotFoundException('Review not found');

    if (review.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this review',
      );
    }

    return review;
  }
}
