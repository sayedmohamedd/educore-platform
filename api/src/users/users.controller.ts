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
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() req: AuthenticatedRequest) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('/me')
  updateMyProfile(
    @Body() dto: UpdateProfileDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.usersService.updateMyProfile(dto, req.user.userId);
  }

  @Delete('/me')
  deleteMyProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.deleteMyProfile(req.user.userId);
  }
}
