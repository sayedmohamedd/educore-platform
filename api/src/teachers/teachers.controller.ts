import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeachersService } from './teachers.service.js';
import { TeacherApplicationDto } from './dtos/teacher-application.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Role, CourseStatus } from '../generated/prisma/client.js';
import { AssignCategoryDto } from '../courses/dtos/assign-category.dto.js';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  getAllTeachers() {
    return this.teachersService.getAll();
  }

  @Get(':id')
  getTeacher(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Post('apply')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  apply(@Req() req: AuthenticatedRequest, @Body() dto: TeacherApplicationDto) {
    return this.teachersService.apply(req.user.userId, dto);
  }

  @Get('me')
  getMyProfile(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getProfile(req.user.userId);
  }

  @Patch('me')
  update(@Req() req: AuthenticatedRequest, @Body() dto: TeacherApplicationDto) {
    return this.teachersService.update(req.user.userId, dto);
  }

  @Get('me/students')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherStudents(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getTeacherStudents(req.user.userId);
  }

  @Get('me/courses')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherCourses(
    @Req() req: AuthenticatedRequest,
    @Query() query: { status: CourseStatus },
  ) {
    return this.teachersService.getMyCourses(req.user.userId, query.status);
  }

  @Get(':id/courses')
  getCourses(@Param('id') id: string) {
    return this.teachersService.getPublicCourses(id);
  }

  @Patch(':teacherId/courses/:courseId/categories')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateCourseCategories(
    @Param('teacherId') teacherId: string,
    @Param('courseId') courseId: string,
    @Body() categories: AssignCategoryDto,
  ) {
    return this.teachersService.assignCategoryToCourse(
      teacherId,
      courseId,
      categories,
    );
  }

  @Get(':teacherId/statistics')
  @Roles(Role.ADMIN)
  getTeacherStatistics(
    @Param('teacherId') teacherId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teachersService.getTeacherStatistics(
      req.user.userId,
      teacherId,
    );
  }

  @Get(':teacherId/courses/:courseId/students/:studentId/progress')
  getCourseStudentProgress(
    @Param('teacherId') teacherId: string,
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.teachersService.getCourseStudentProgress(
      teacherId,
      courseId,
      studentId,
    );
  }

  // Wallet
  @Get(':teacherId/wallet')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWallet(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getWallet(req.user.userId);
  }

  @Get(':teacherId/wallet/transactions')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWalletTransactions(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getTeacherWalletTransactions(req.user.userId);
  }

  @Get(':teacherId/wallet/earnings')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWalletEarnings(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getTeacherWalletEarnings(req.user.userId);
  }

  @Get(':teacherId/wallet/withdrawals')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWalletWithdrawals(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getTeacherWalletWithdrawals(req.user.userId);
  }
}
