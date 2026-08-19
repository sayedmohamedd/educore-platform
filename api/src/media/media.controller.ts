import {
  Controller,
  Delete,
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

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mediaService.upload(req.user.userId, file);
  }

  @Delete(':id')
  @Roles('INSTRUCTOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.mediaService.remove(req.user.userId, id);
  }
}
