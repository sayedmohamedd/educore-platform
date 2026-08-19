import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourse(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        sections: {
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              orderBy: {
                order: 'asc',
              },
              include: {
                lessonProgress: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return new ApiResponse(
      true,
      'Course learning data retrieved successfully',
      course,
    );
  }

  async getLesson(userId: string, courseId: string, lessonId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        section: {
          courseId,
        },
      },
      include: {
        section: true,
        lessonProgress: {
          where: {
            userId,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return new ApiResponse(true, 'Lesson retrieved successfully', lesson);
  }

  async completeLesson(userId: string, courseId: string, lessonId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
        section: {
          courseId,
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const progress = await this.prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      create: {
        userId,
        lessonId,
      },
      update: {
        completedAt: new Date(),
      },
    });

    return new ApiResponse(true, 'Lesson completed successfully', progress);
  }
}
