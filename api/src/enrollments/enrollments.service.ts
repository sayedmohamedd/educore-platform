import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationDto } from '../common/pagination/pagination.dto.js';
import {
  getPagination,
  getPaginationMeta,
} from '../common/pagination/pagination.util.js';
@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query: PaginationDto) {
    const { page = 1, limit = 10 } = query;
    const { skip, take } = getPagination(page, limit);

    const [enrollments, total] = await Promise.all([
      this.prisma.enrollment.findMany({
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
        skip,
        take,
      }),
      this.prisma.enrollment.count({
        where: {
          userId,
        },
      }),
    ]);

    const meta = getPaginationMeta(page, limit, total);

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
      meta,
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
