import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeachersService } from './teachers.service.js';
import { TeacherApplicationDto } from './dtos/teacher-application.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  getAllTeachers() {
    return this.teachersService.getAll();
  }

  @Post('apply')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  apply(@Req() req: AuthenticatedRequest, @Body() dto: TeacherApplicationDto) {
    return this.teachersService.apply(req.user.userId, dto);
  }

  @Get('me')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getMyProfile(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getProfile(req.user.userId);
  }

  @Get(':teacherId')
  getPublicProfile(@Param('teacherId') teacherId: string) {
    return this.teachersService.getPublicProfile(teacherId);
  }

  @Patch(':teacherId/approve')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('teacherId') teacherId: string) {
    return this.teachersService.approve(teacherId);
  }

  @Patch(':teacherId/reject')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  reject(@Param('teacherId') teacherId: string) {
    return this.teachersService.reject(teacherId);
  }
}
