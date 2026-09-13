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
import { Role } from '../generated/prisma/client.js';
import { QueryDto } from '../payments/dtos/query-dto.js';
import { UpdateTeacherProfileDto } from './dtos/update-teacher-profile.dto.js';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get() // done
  getAllTeachers(@Query() query: QueryDto) {
    return this.teachersService.getAll(query);
  }

  @Post('apply') // done
  @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  apply(@Req() req: AuthenticatedRequest, @Body() dto: TeacherApplicationDto) {
    return this.teachersService.apply(req.user.userId, dto);
  }

  @Get('me') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getMyProfile(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getProfile(req.user.userId);
  }

  @Patch('me') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateTeacherProfileDto,
  ) {
    return this.teachersService.update(req.user.userId, dto);
  }

  @Get(':id') // done
  getTeacher(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Get('me/students') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherStudents(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getMyStudents(req.user.userId);
  }

  @Get('me/courses') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherCourses(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getMyCourses(req.user.userId);
  }

  @Get('me/statistics') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getMyStatistics(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getMyStatistics(req.user.userId);
  }

  // Wallet
  @Get('me/wallet') // done
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWallet(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getWallet(req.user.userId);
  }

  @Get('me/wallet/transactions') // done
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWalletTransactions(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getMyTransactions(req.user.userId);
  }

  // done
  @Get('me/wallet/earnings') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWalletEarnings(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getMyEarnings(req.user.userId);
  }

  @Get('me/wallet/withdrawals') // done
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTeacherWalletWithdrawals(@Req() req: AuthenticatedRequest) {
    return this.teachersService.getMyWithdrawals(req.user.userId);
  }
}

// @Get(':teacherId/courses/:courseId/students/:studentId/progress')
// @Roles(Role.INSTRUCTOR)
// @UseGuards(JwtAuthGuard, RolesGuard)
// getCourseStudentProgress(
//   @Param('teacherId') teacherId: string,
//   @Param('courseId') courseId: string,
//   @Param('studentId') studentId: string,
// ) {
//   return this.teachersService.getCourseStudentProgress(
//     teacherId,
//     courseId,
//     studentId,
//   );
// }
