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
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { CreateLessonDto } from './dtos/create-lesson.dto.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/client.js';

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('sections/:sectionId/lessons')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(req.user.userId, lessonId, dto);
  }

  @Delete('lessons/:lessonId')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonsService.remove(req.user.userId, lessonId);
  }

  // Resources Routes
  @Get('lessons/:lessonId/resources')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getResources(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonsService.getResources(req.user.userId, lessonId);
  }

  @Post('lessons/:lessonId/resources')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  addResource(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
    @Body() dto: { mediaId: string },
  ) {
    return this.lessonsService.addResource(
      req.user.userId,
      lessonId,
      dto.mediaId,
    );
  }

  @Delete('lessons/:lessonId/resources/:mediaId')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  removeResource(
    @Req() req: AuthenticatedRequest,
    @Param('lessonId') lessonId: string,
    @Param('mediaId') mediaId: string,
  ) {
    return this.lessonsService.removeResource(
      req.user.userId,
      lessonId,
      mediaId,
    );
  }
}
