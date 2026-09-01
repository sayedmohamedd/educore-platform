import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateMediaDto } from './dtos/create-media.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { MediaService } from './media.service.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Role } from '../generated/prisma/client.js';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getAllMedia() {
    return this.mediaService.findAll();
  }

  @Post()
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  upload(@Req() req: AuthenticatedRequest, @Body() dto: CreateMediaDto) {
    return this.mediaService.upload(req.user.userId, dto);
  }

  @Get('signature')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  getUploadSignature(@Query('folder') folder?: string) {
    return this.mediaService.getUploadSignature(folder ?? 'educore');
  }

  @Get(':id')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  getMediaById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.mediaService.findOne(req.user.userId, id);
  }

  @Delete(':id')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.mediaService.remove(req.user.userId, id);
  }
}

// @Post()
// @Roles(Role.INSTRUCTOR)
// @UseGuards(RolesGuard)
// @UseInterceptors(FileInterceptor('file'))
// upload(
//   @Req() req: AuthenticatedRequest,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   return this.mediaService.upload(req.user.userId, file);
// }
