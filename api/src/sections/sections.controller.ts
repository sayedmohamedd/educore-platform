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

@Controller()
@Roles(Role.INSTRUCTOR)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post('courses/:courseId/sections')
  create(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
  ) {
    return this.sectionsService.create(req.user.userId, courseId, dto);
  }

  @Get('sections/:id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Patch('sections/:id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(req.user.userId, id, dto);
  }

  @Delete('sections/:id')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.sectionsService.remove(req.user.userId, id);
  }
}
