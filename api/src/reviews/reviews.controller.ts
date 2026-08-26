import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { ReviewsService } from './reviews.service.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { CreateReviewDto } from './dtos/create-review.dto.js';
import { UpdateReviewDto } from './dtos/update-review.dto.js';
import { Role } from '../generated/prisma/client.js';

@Controller()
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(readonly reviewsService: ReviewsService) {}

  @Get('courses/:courseId/reviews')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Post('courses/:courseId/reviews')
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(req.user.userId, dto);
  }

  @Patch('reviews/:id')
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(req.user.userId, id, dto);
  }

  @Delete('reviews/:id')
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.reviewsService.delete(req.user.userId, id);
  }
}
