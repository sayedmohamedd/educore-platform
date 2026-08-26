import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { UsersService } from './users.service.js';
import { UpdateProfileDto } from './dtos/update-profile.dto.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: AuthenticatedRequest) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Body() dto: UpdateProfileDto, @Req() req: AuthenticatedRequest) {
    return this.usersService.updateProfile(dto, req.user.userId);
  }

  @Delete('/me')
  @UseGuards(JwtAuthGuard)
  deleteMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.delete(req.user.userId);
  }

  @Get('me/courses')
  @UseGuards(JwtAuthGuard)
  getUserCourses(@Req() req: AuthenticatedRequest) {
    return this.usersService.getUserCourses(req.user.userId);
  }
}
