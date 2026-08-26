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
import { CreateSectionDto } from './dtos/create-section.dto.js';
import { SectionsService } from './sections.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { UpdateSectionDto } from './dtos/update-section.dto.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Role } from '../generated/prisma/client.js';

@Controller('')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get('courses/:courseId/sections')
  findAll(@Param('courseId') courseId: string) {
    return this.sectionsService.findAll(courseId);
  }

  @Post('courses/:courseId/sections')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
  ) {
    return this.sectionsService.create(req.user.userId, courseId, dto);
  }

  @Get('sections/:sectionId')
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('sectionId') sectionId: string) {
    return this.sectionsService.findOne(sectionId);
  }

  @Patch('sections/:sectionId')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(req.user.userId, sectionId, dto);
  }

  @Delete('sections/:sectionId')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('sectionId') sectionId: string,
  ) {
    return this.sectionsService.remove(req.user.userId, sectionId);
  }
}
