import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(userId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== 'PUBLISHED') {
      throw new ConflictException('Course is not available for enrollment');
    }

    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('Already enrolled in this course');
    }

    const enrollment = await this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });

    return new ApiResponse(true, 'Enrolled successfully', enrollment);
  }

  async findAll(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            teacher: {
              include: {
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    return new ApiResponse(
      true,
      'Enrollments retrieved successfully',
      enrollments,
    );
  }

  async findOne(userId: string, id: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        course: {
          include: {
            teacher: {
              include: {
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    avatar: true,
                  },
                },
              },
            },
            sections: {
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
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return new ApiResponse(
      true,
      'Enrollment retrieved successfully',
      enrollment,
    );
  }
}
