import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { LearningService } from './learning.service.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@Controller('learning')
@UseGuards(JwtAuthGuard)
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get(':courseId')
  getCourse(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
  ) {
    return this.learningService.getCourse(req.user.userId, courseId);
  }

  @Get(':courseId/lessons/:lessonId')
  getLesson(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.learningService.getLesson(req.user.userId, courseId, lessonId);
  }

  @Post(':courseId/lessons/:lessonId/complete')
  completeLesson(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.learningService.completeLesson(
      req.user.userId,
      courseId,
      lessonId,
    );
  }
}
