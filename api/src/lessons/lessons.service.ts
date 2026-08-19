import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { UpdateLessonDto } from './dtos/update-lesson.dto.js';
import { CreateLessonDto } from './dtos/create-lesson..dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getTeacher(userId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacher || teacher.status !== 'APPROVED') {
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

  async create(userId: string, sectionId: string, dto: CreateLessonDto) {
    await this.getTeacherSection(userId, sectionId);

    const lesson = await this.prisma.lesson.create({
      data: {
        sectionId,
        title: dto.title,
        description: dto.description,
        videoId: dto.videoUrl,
        duration: dto.duration,
        order: dto.order,
        isFree: dto.isFree ?? false,
      },
    });

    return new ApiResponse(true, 'Lesson created successfully', lesson);
  }

  async findOne(lessonId: string) {
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

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return new ApiResponse(true, 'Lesson retrieved successfully', lesson);
  }

  async update(userId: string, lessonId: string, dto: UpdateLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    await this.getTeacherSection(userId, lesson.sectionId);

    const updated = await this.prisma.lesson.update({
      where: { id: lessonId },
      data: dto,
    });

    return new ApiResponse(true, 'Lesson updated successfully', updated);
  }

  async remove(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    await this.getTeacherSection(userId, lesson.sectionId);

    await this.prisma.lesson.delete({
      where: { id: lessonId },
    });

    return new ApiResponse(true, 'Lesson deleted successfully');
  }
}
