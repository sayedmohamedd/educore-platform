import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        enrolledAt: true,
        course: {
          select: {
            id: true,
            title: true,
            duration: true,

            teacher: {
              select: {
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
              select: {
                _count: {
                  select: {
                    lessons: true,
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

    const result = enrollments.map((enrollment) => ({
      ...enrollment,
      course: {
        ...enrollment.course,
        totalLessons: enrollment.course.sections.reduce(
          (total, section) => total + section._count.lessons,
          0,
        ),
        sections: undefined,
      },
    }));

    return new ApiResponse(true, 'Enrollments retrieved successfully', {
      enrollments: result,
    });
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

// async enroll(userId: string, courseId: string) {
//   // Check if course is published
//   const course = await this.prisma.course.findUnique({
//     where: {
//       id: courseId,
//     },
//   });

//   if (!course) {
//     throw new NotFoundException('Course not found');
//   }

//   if (course.status !== 'PUBLISHED') {
//     throw new ConflictException('Course is not available for enrollment');
//   }

//   // Check if user is already enrolled in the course
//   const existingEnrollment = await this.prisma.enrollment.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId,
//       },
//     },
//   });

//   if (existingEnrollment) {
//     throw new ConflictException('Already enrolled in this course');
//   }

//   const payment = await this.prisma.payment.findFirst({
//     where: {
//       userId: userId,
//       courseId: courseId,
//       status: PaymentStatus.APPROVED,
//     },
//   });

//   if (!payment) {
//     throw new ConflictException('You need to pay for this course first');
//   }

//   // Enroll user in the course
//   const enrollment = await this.prisma.enrollment.create({
//     data: {
//       userId,
//       courseId,
//     },
//   });

//   return new ApiResponse(true, 'Enrolled successfully', enrollment);
// }
