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
  // UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/client.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { RejectionDto } from '../payments/dtos/reject-payment.dto.js';
import { CreateCategoryDto } from '../categories/dto/create-category.dto.js';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto.js';

@Controller('admin')
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //   Statistics
  @Get('statistics')
  getStudents() {
    return this.adminService.getStatistics();
  }

  //   Teachers - done
  @Get('teachers')
  getTeachers() {
    return this.adminService.getTeachers();
  }

  @Patch('teachers/:id/approve')
  approveTeacher(@Param('id') id: string) {
    return this.adminService.approveTeacher(id);
  }

  @Patch('teachers/:id/reject')
  rejectTeacher(@Param('id') id: string) {
    return this.adminService.rejectTeacher(id);
  }

  //   Payments - done
  @Get('payments')
  getPayments() {
    return this.adminService.getPayments();
  }

  @Patch('payments/:id/approve')
  approvePayment(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.adminService.approvePayment(id, req.user.userId);
  }

  @Patch('payments/:id/reject')
  rejectPayment(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: RejectionDto,
  ) {
    return this.adminService.rejectPayment(id, req.user.userId, dto);
  }

  //   Categories - done
  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.adminService.createCategory(dto);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.adminService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.adminService.deleteCategory(id);
  }

  // Courses
  @Patch('courses/:id/approve')
  approveCourse(@Param('id') id: string) {
    return this.adminService.approveCourse(id);
  }

  @Patch('courses/:id/reject')
  rejectCourse(@Param('id') id: string) {
    return this.adminService.rejectCourse(id);
  }

  // Users

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() dto: any) {
    return this.adminService.updateUser(id, dto);
  }
  //   Withdrawals
  //   @Get('withdrawals')
  //   getWithdrawals() {
  //     return this.adminService.getWithdrawals();
  //   }

  //   @Patch('withdrawals/:id/approve')
  //   approveWithdrawal(@Param('id') id: string) {
  //     return this.adminService.approveWithdrawal(id);
  //   }

  //   @Patch('withdrawals/:id/reject')
  //   rejectWithdrawal(@Param('id') id: string) {
  //     return this.adminService.rejectWithdrawal(id);
  //   }
}
