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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { UpdateLessonDto } from './dtos/update-lesson.dto.js';
import { LessonsService } from './lessons.service.js';
import { CreateLessonDto } from './dtos/create-lesson..dto.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('sections/:sectionId/lessons')
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: AuthenticatedRequest,
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.lessonsService.create(req.user.userId, sectionId, dto);
  }

  @Get('lessons/:lessonId')
  findOne(@Param('lessonId') lessonId: string) {
    return this.lessonsService.findOne(lessonId);
  }

  @Patch('lessons/:lessonId')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(req.user.userId, lessonId, dto);
  }

  @Delete('lessons/:lessonId')
  @UseGuards(JwtAuthGuard)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonsService.remove(req.user.userId, lessonId);
  }
}
