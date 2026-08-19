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
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

import { AssignmentsService } from './assignments.service.js';

import { CreateAssignmentDto } from './dtos/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto.js';
import { SubmitAssignmentDto } from './dtos/submit-assignment.dto.js';
import { GradeAssignmentDto } from './dtos/grade-assignment.dto.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';

@Controller('assignments')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Get all assignments for a user
  @Get()
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  findAll(@Req() req: AuthenticatedRequest) {
    return this.assignmentsService.findAll(req.user.userId);
  }

  // Create assignment for a lesson by a teacher
  @Post()
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.create(req.user.userId, dto);
  }

  // Update assignment by a teacher
  @Patch(':id')
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(req.user.userId, id, dto);
  }

  // Remove assignment by a teacher
  @Delete(':id')
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.assignmentsService.remove(req.user.userId, id);
  }

  // Get assignment by id
  @Get(':id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  // Submit assignment by a student
  @Post(':id/submit')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  submit(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: SubmitAssignmentDto,
  ) {
    return this.assignmentsService.submit(req.user.userId, id, dto);
  }

  // Grade submission by a teacher
  @Post(':id/grade')
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  grade(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: GradeAssignmentDto,
  ) {
    return this.assignmentsService.grade(req.user.userId, id, dto);
  }
}
