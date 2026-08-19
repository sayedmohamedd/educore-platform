import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSectionDto } from './dtos/create-section.dto.js';
import { UpdateSectionDto } from './dtos/update-section.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';

@Injectable()
export class SectionsService {
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

  private async getTeacherCourse(userId: string, courseId: string) {
    const teacher = await this.getTeacher(userId);

    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacher.id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async create(userId: string, courseId: string, dto: CreateSectionDto) {
    await this.getTeacherCourse(userId, courseId);

    const section = await this.prisma.section.create({
      data: {
        courseId,
        title: dto.title,
        order: dto.order,
      },
    });

    return new ApiResponse(true, 'Section created successfully', section);
  }

  async findAll(courseId: string) {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      include: {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return new ApiResponse(true, 'Sections retrieved successfully', sections);
  }

  async update(userId: string, sectionId: string, dto: UpdateSectionDto) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    await this.getTeacherCourse(userId, section.courseId);

    const updated = await this.prisma.section.update({
      where: { id: sectionId },
      data: dto,
    });

    return new ApiResponse(true, 'Section updated successfully', updated);
  }

  async remove(userId: string, sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    await this.getTeacherCourse(userId, section.courseId);

    await this.prisma.section.delete({
      where: { id: sectionId },
    });

    return new ApiResponse(true, 'Section deleted successfully');
  }
}
