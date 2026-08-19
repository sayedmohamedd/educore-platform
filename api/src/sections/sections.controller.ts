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

@Controller('courses/:courseId/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  findAll(@Param('courseId') courseId: string) {
    return this.sectionsService.findAll(courseId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: AuthenticatedRequest,
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
  ) {
    return this.sectionsService.create(req.user.userId, courseId, dto);
  }

  @Patch(':sectionId')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(req.user.userId, sectionId, dto);
  }

  @Delete(':sectionId')
  @UseGuards(JwtAuthGuard)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('sectionId') sectionId: string,
  ) {
    return this.sectionsService.remove(req.user.userId, sectionId);
  }
}
