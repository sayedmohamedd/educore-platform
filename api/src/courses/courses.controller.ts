import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { Role } from '../generated/prisma/client.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.coursesService.findAll(query);
  }

  @Post()
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateCourseDto) {
    return this.coursesService.create(req.user.userId, dto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.coursesService.findOne(slug);
  }

  @Patch(':courseId')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.coursesService.remove(req.user.userId, id);
  }

  @Patch(':id/submit')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  submit(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.coursesService.submit(req.user.userId, id);
  }

  @Patch(':id/publish')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  publish(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.coursesService.publish(req.user.userId, id);
  }

  @Delete(':courseId/categories/:categoryId')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  reemoveCategory(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.coursesService.removeCategoryFromCourse(
      req.user.userId,
      courseId,
      categoryId,
    );
  }
}
