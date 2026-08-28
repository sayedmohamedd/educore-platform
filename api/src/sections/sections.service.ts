import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSectionDto } from './dtos/create-section.dto.js';
import { UpdateSectionDto } from './dtos/update-section.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { InstructorHelperService } from '../common/services/instructor-helper/instructor-helper.service.js';
import slugify from 'slugify';

@Injectable()
export class SectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly instructorHelper: InstructorHelperService,
  ) {}

  // By Admin
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

  async findOne(sectionId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return new ApiResponse(true, 'Section retrieved successfully', section);
  }

  // By Teacher
  async create(userId: string, courseId: string, dto: CreateSectionDto) {
    // check course and teacher Authorization
    await this.instructorHelper.getTeacherCourse(userId, courseId);

    const slug = slugify(dto.title, { lower: true });

    const section = await this.prisma.section.create({
      data: {
        slug,
        courseId,
        title: dto.title,
        order: dto.order,
      },
    });

    return new ApiResponse(true, 'Section created successfully', section);
  }

  async update(userId: string, sectionId: string, dto: UpdateSectionDto) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    await this.instructorHelper.getTeacherCourse(userId, section.courseId);

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

    await this.instructorHelper.getTeacherCourse(userId, section.courseId);

    await this.prisma.section.delete({
      where: { id: sectionId },
    });

    return new ApiResponse(true, 'Section deleted successfully');
  }
}
