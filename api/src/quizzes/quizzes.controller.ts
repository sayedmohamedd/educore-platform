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
import { Roles } from '../auth/decorators/roles.decorator.js';
import { QuizzesService } from './quizzes.service.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { CreateQuizDto } from './dtos/create-quiz.dto.js';
import { UpdateQuizDto } from './dtos/update-quiz.dto.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Role } from '../generated/prisma/client.js';

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateQuizDto) {
    return this.quizzesService.create(req.user.userId, dto);
  }

  @Get(':id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.quizzesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.quizzesService.remove(req.user.userId, id);
  }

  @Post(':id/submit')
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  submit(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: { answers: Record<string, string> },
  ) {
    return this.quizzesService.submit(req.user.userId, id, dto.answers);
  }
}
