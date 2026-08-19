import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { EnrollmentsService } from './enrollments.service.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';

@Controller()
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('courses/:courseId/enroll')
  enroll(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
  ) {
    return this.enrollmentsService.enroll(req.user.userId, courseId);
  }

  @Get('enrollments')
  @Roles('STUDENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@Req() req: AuthenticatedRequest) {
    return this.enrollmentsService.findAll(req.user.userId);
  }

  @Get('enrollments/:id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.enrollmentsService.findOne(req.user.userId, id);
  }
}
