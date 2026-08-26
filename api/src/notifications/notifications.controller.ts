import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { NotificationsService } from './notifications.service.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(readonly notificationsService: NotificationsService) {}
  @Get()
  getAll(@Req() req: AuthenticatedRequest) {
    return this.notificationsService.getAll(req.user.userId);
  }

  @Get('/:id')
  getOneById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notificationsService.findOne(req.user.userId, id);
  }

  @Patch('/:id/read')
  readOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notificationsService.readOne(req.user.userId, id);
  }

  @Patch('/read-all')
  readAll(@Req() req: AuthenticatedRequest) {
    return this.notificationsService.readAll(req.user.userId);
  }

  @Delete('/:id')
  deleteOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.notificationsService.deleteOne(req.user.userId, id);
  }
}
