import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { EnrollmentsService } from './enrollments.service.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Role } from '../generated/prisma/client.js';
import { PaginationDto } from '../common/pagination/pagination.dto.js';

@Controller()
@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // Get All Enrollment Courses for the logged in student
  @Get('enrollments/me')
  findAll(@Req() req: AuthenticatedRequest, @Query() query: PaginationDto) {
    return this.enrollmentsService.findAll(req.user.userId, query);
  }

  // Get All Enrollment Course by Id for the logged in student
  @Get('enrollments/:id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.enrollmentsService.findOne(req.user.userId, id);
  }
}
