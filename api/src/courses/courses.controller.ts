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
import { CreateCourseDto } from './dtos/create-course.dto.js';
import { CoursesService } from './courses.service.js';
import { UpdateCourseDto } from './dtos/update-course.dto.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Post()
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateCourseDto) {
    return this.coursesService.create(req.user.userId, dto);
  }

  @Get(':courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }

  @Patch(':courseId')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(req.user.userId, courseId, dto);
  }

  @Delete(':courseId')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
  ) {
    return this.coursesService.remove(req.user.userId, courseId);
  }

  @Post(':courseId/submit')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  submit(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
  ) {
    return this.coursesService.submit(req.user.userId, courseId);
  }

  @Post(':courseId/publish')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  publish(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
  ) {
    return this.coursesService.publish(req.user.userId, courseId);
  }

  // admin managament courses
  @Patch(':courseId/approve')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('courseId') courseId: string) {
    return this.coursesService.approve(courseId);
  }

  @Patch(':courseId/reject')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  reject(@Param('courseId') courseId: string) {
    return this.coursesService.reject(courseId);
  }
}
