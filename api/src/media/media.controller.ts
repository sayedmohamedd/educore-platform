import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { MediaService } from './media.service.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
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
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.mediaService.upload(req.user.userId, file);
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
