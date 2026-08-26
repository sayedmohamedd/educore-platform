/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Multer } from 'multer';
import cloudinary from '../config/cloudinary.config.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'educore',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(file.buffer);
    });

    let type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';

    if (result.resource_type === 'image') {
      type = 'IMAGE';
    } else if (result.resource_type === 'video') {
      type = 'VIDEO';
    } else {
      type = 'DOCUMENT';
    }

    const media = await this.prisma.media.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        type,
        resourceType: result.resource_type,
        filename: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        uploaderId: userId,
      },
    });

    return new ApiResponse(true, 'File uploaded successfully', media);
  }

  async findOne(userId: string, mediaId: string) {
    if (!mediaId) throw new BadRequestException('Media id is required');

    const media = await this.prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    if (media.uploaderId !== userId) {
      throw new ForbiddenException('You cannot access this file');
    }

    return new ApiResponse(true, 'Media fetched successfully', media);
  }

  async remove(userId: string, id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    if (media.uploaderId !== userId) {
      throw new ForbiddenException('You cannot delete this file');
    }

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.resourceType ?? 'image',
    });

    await this.prisma.media.delete({
      where: { id },
    });

    return new ApiResponse(true, 'File deleted successfully');
  }

  async findAll() {
    const media = await this.prisma.media.findMany();
    return new ApiResponse(true, 'Media fetched successfully', media);
  }
}
