import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { UpdateLessonDto } from './dtos/update-lesson.dto.js';
import { CreateLessonDto } from './dtos/create-lesson.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import slugify from 'slugify';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, sectionId: string, dto: CreateLessonDto) {
    await this.getTeacherSection(userId, sectionId);

    const slug = slugify(dto.title, { lower: true });
    const lesson = await this.prisma.lesson.create({
      data: {
        ...dto,
        slug,
        sectionId,
      },
    });

    return new ApiResponse(true, 'Lesson created successfully', lesson);
  }

  async findOne(lessonId: string) {
    if (!lessonId) throw new BadRequestException('Invalid lessonId');

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        section: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    return new ApiResponse(true, 'Lesson retrieved successfully', lesson);
  }

  async update(userId: string, lessonId: string, dto: UpdateLessonDto) {
    await this.getTeacherLesson(userId, lessonId);

    const updated = await this.prisma.lesson.update({
      where: { id: lessonId },
      data: dto,
    });

    return new ApiResponse(true, 'Lesson updated successfully', updated);
  }

  async remove(userId: string, lessonId: string) {
    await this.getTeacherLesson(userId, lessonId);

    await this.prisma.lesson.delete({
      where: { id: lessonId },
    });

    return new ApiResponse(true, 'Lesson deleted successfully');
  }

  async attachVideoToLesson(userId: string, lessonId: string, mediaId: string) {
    await this.getTeacherLesson(userId, lessonId);

    await this.getMedia(userId, mediaId);

    const updatedLesson = await this.prisma.lesson.update({
      where: { id: lessonId },
      data: { videoId: mediaId },
    });

    return new ApiResponse(
      true,
      `Video Added to Lesson: ${updatedLesson.title} Successfully`,
      updatedLesson,
    );
  }

  // Resources
  async addResource(userId: string, lessonId: string, mediaId: string) {
    await this.getTeacherLesson(userId, lessonId);

    const media = await this.prisma.media.findFirst({
      where: {
        id: mediaId,
        type: 'DOCUMENT',
        uploaderId: userId,
      },
    });

    if (!media) {
      throw new BadRequestException('Invalid resource');
    }

    const resource = await this.prisma.lessonResource.create({
      data: {
        lessonId,
        mediaId,
      },
      include: {
        media: true,
      },
    });

    return new ApiResponse(true, 'Resource added successfully', resource);
  }

  async getResources(userId: string, lessonId: string) {
    await this.getTeacherLesson(userId, lessonId);

    const resources = await this.prisma.lessonResource.findMany({
      where: {
        lessonId,
      },
      include: {
        media: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return new ApiResponse(
      true,
      'Lesson resources retrieved successfully',
      resources,
    );
  }

  async removeResource(userId: string, lessonId: string, mediaId: string) {
    await this.getTeacherLesson(userId, lessonId);

    const resource = await this.prisma.lessonResource.findUnique({
      where: {
        lessonId_mediaId: {
          lessonId,
          mediaId,
        },
      },
    });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    await this.prisma.lessonResource.delete({
      where: {
        lessonId_mediaId: {
          lessonId,
          mediaId,
        },
      },
    });

    return new ApiResponse(true, 'Resource removed successfully');
  }

  // Helper Private Methods
  private async getTeacher(userId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    if (teacher.status !== 'APPROVED') {
      throw new ForbiddenException('Teacher is not approved');
    }

    return teacher;
  }

  private async getTeacherSection(userId: string, sectionId: string) {
    const teacher = await this.getTeacher(userId);

    const section = await this.prisma.section.findFirst({
      where: {
        id: sectionId,
        course: {
          teacherId: teacher.id,
        },
      },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return section;
  }

  private async getTeacherLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        section: {
          course: {
            teacher: {
              userId,
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  private async getMedia(userId: string, mediaId: string) {
    const media = await this.prisma.media.findFirst({
      where: {
        id: mediaId,
        type: 'VIDEO',
        uploaderId: userId,
      },
    });

    if (!media) {
      throw new BadRequestException('Invalid video');
    }

    return media;
  }
}
