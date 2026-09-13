import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TeacherApplicationDto } from './dtos/teacher-application.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { InstructorHelperService } from '../common/services/instructor-helper/instructor-helper.service.js';
import { QueryDto } from '../payments/dtos/query-dto.js';
import {
  getPagination,
  getPaginationMeta,
} from '../common/pagination/pagination.util.js';
import { UpdateTeacherProfileDto } from './dtos/update-teacher-profile.dto.js';
import { TransactionType } from '../generated/prisma/enums.js';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    readonly instructorHelper: InstructorHelperService,
  ) {}

  // done
  async getAll(query: QueryDto) {
    const { page = 1, limit = 10 } = query;

    const { skip, take } = getPagination(page, limit);

    const [teachers, total] = await Promise.all([
      this.prisma.teacherProfile.findMany({
        where: {
          status: 'APPROVED',
        },
        select: {
          id: true,
          title: true,
          bio: true,
          expertise: true,

          user: {
            select: {
              fullName: true,
              avatar: {
                select: {
                  url: true,
                },
              },
            },
          },
          _count: {
            select: {
              courses: {
                where: {
                  status: 'PUBLISHED',
                },
              },
            },
          },
        },
        skip,
        take,
      }),

      this.prisma.teacherProfile.count({
        where: {
          status: 'APPROVED',
        },
      }),
    ]);

    const meta = getPaginationMeta(page, limit, total);

    return new ApiResponse(true, 'Teachers retrieved successfully', {
      teachers,
      meta,
    });
  }

  // done
  async findOne(teacherId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        id: teacherId,
        status: 'APPROVED',
      },
      select: {
        id: true,
        title: true,
        bio: true,
        expertise: true,

        user: {
          select: {
            fullName: true,
            avatar: {
              select: {
                url: true,
              },
            },
          },
        },

        courses: {
          where: {
            status: 'PUBLISHED',
          },
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            price: true,
            duration: true,
            createdAt: true,
            thumbnail: {
              select: {
                url: true,
              },
            },
            categories: {
              select: {
                courseId: false,
                categoryId: false,
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },

        _count: {
          select: {
            courses: {
              where: {
                status: 'PUBLISHED',
              },
            },
          },
        },
      },
    });

    const formatted = teacher
      ? {
          ...teacher,
          courses: teacher.courses.map((course) => ({
            ...course,
            categories: course.categories.map((cat) => cat.category),
          })),
        }
      : null;

    return new ApiResponse(true, 'Teachers retrieved successfully', formatted);
  }

  // done
  async apply(userId: string, dto: TeacherApplicationDto) {
    const existing = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existing) {
      throw new ConflictException('Teacher application already exists');
    }

    const profile = await this.prisma.teacherProfile.create({
      data: {
        userId,
        bio: dto.bio,
        title: dto.title,
        expertise: dto.expertise,
        phone: dto.phone,
      },
    });

    return new ApiResponse(
      true,
      'Teacher application submitted successfully',
      profile,
    );
  }

  // My Teacher Profile - done
  async getProfile(userId: string) {
    const profile = await this.prisma.teacherProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        title: true,
        bio: true,
        expertise: true,
        phone: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatar: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    if (!profile) throw new NotFoundException('Teacher profile not found');

    return new ApiResponse(
      true,
      'Teacher profile retrieved successfully',
      profile,
    );
  }

  async update(userId: string, dto: UpdateTeacherProfileDto) {
    // check teacher
    const teacher = await this.instructorHelper.getTeacher(userId);

    // update
    const profile = await this.prisma.teacherProfile.update({
      where: {
        id: teacher.id,
      },
      data: dto,
    });

    return new ApiResponse(
      true,
      'Teacher profile updated successfully',
      profile,
    );
  }

  // Find My Students - done
  async getMyStudents(userId: string) {
    const teacher = await this.instructorHelper.getTeacher(userId);

    const students = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
        enrollments: {
          some: {
            course: {
              teacherId: teacher.id,
            },
          },
        },
      },

      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: {
          select: {
            url: true,
          },
        },
        enrollments: {
          where: {
            course: {
              teacherId: teacher.id,
            },
          },

          select: {
            course: {
              select: {
                title: true,
              },
            },
            enrolledAt: true,
          },

          orderBy: {
            enrolledAt: 'asc',
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return new ApiResponse(true, 'Students retrieved successfully', {
      students,
    });
  }

  // Find My Courses - done
  async getMyCourses(userId: string) {
    // check if teacher is exists and approved or not
    const teacher = await this.instructorHelper.getTeacher(userId);

    const rawCourses = await this.prisma.course.findMany({
      where: { teacherId: teacher.id },
      select: {
        id: true,
        title: true,
        price: true,
        duration: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        thumbnail: {
          select: {
            url: true,
          },
        },
        categories: {
          include: {
            category: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
      },
    });

    // format
    const courses = rawCourses.map((course) => ({
      ...course,
      categories: course.categories.map((cat) => cat.category),
    }));

    return new ApiResponse(true, 'Courses retrieved successfully', { courses });
  }

  // Find specific Course Students
  async getCourseStudents(userId: string, courseId: string) {
    // check course and teacher Authorization
    await this.instructorHelper.getTeacherCourse(userId, courseId);

    const students = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
        enrollments: {
          some: {
            course: {
              id: courseId,
            },
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: {
          select: {
            url: true,
          },
        },
      },
    });

    return new ApiResponse(true, 'Students retrieved successfully', {
      students,
    });
  }

  // My statistics - done
  async getMyStatistics(userId: string) {
    const teacher = await this.instructorHelper.getTeacher(userId);

    const students = await this.prisma.user.count({
      where: {
        role: 'STUDENT',
        enrollments: {
          some: {
            course: {
              teacherId: teacher.id,
            },
          },
        },
      },
    });

    let courses = await this.prisma.course.findMany({
      where: { teacherId: teacher.id },
      select: {
        id: true,
        title: true,
        status: true,
        price: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    courses = courses.map((course) => ({
      ...course,
      students: course._count.enrollments,
    }));

    const publishedCourses = courses.filter(
      (course) => course.status === 'PUBLISHED',
    );

    const totalRevenue = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
      select: { balance: true },
    });

    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        course: {
          teacherId: teacher.id,
        },
      },
      select: {
        id: true,
        enrolledAt: true,
        course: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    return new ApiResponse(true, 'Statistics retrieved successfully', {
      courses,
      students,
      publishedCourses: publishedCourses.length,
      totalRevenue: totalRevenue?.balance,
      enrollments,
    });
  }

  // course student progress
  async getCourseStudentProgress(
    teacherId: string,
    courseId: string,
    studentId: string,
  ) {
    // check course and teacher Authorization
    await this.instructorHelper.getTeacherCourse(teacherId, courseId);

    // check student
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: studentId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        sections: {
          include: {
            lessons: {
              include: {
                lessonProgress: {
                  where: {
                    userId: studentId,
                  },
                },
              },
            },
          },
        },
      },
    });

    return new ApiResponse(true, 'Students retrieved successfully', course);
  }

  // done
  async getWallet(userId: string) {
    // check teacher
    const teacher = await this.instructorHelper.getTeacher(userId);

    // get wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
    });

    if (!wallet) throw new NotFoundException('Wallet not found');

    return new ApiResponse(true, 'Wallet retrieved successfully', wallet);
  }

  // done
  async getMyTransactions(userId: string) {
    // check teacher
    const teacher = await this.instructorHelper.getTeacher(userId);

    // get wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const transactions = await this.prisma.transaction.findMany({
      where: { walletId: wallet.id },
    });

    return new ApiResponse(
      true,
      'Wallet transactions retrieved successfully',
      transactions,
    );
  }

  // done
  async getMyEarnings(userId: string) {
    const teacher = await this.instructorHelper.getTeacher(userId);

    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
    });

    if (!wallet) throw new NotFoundException('Wallet not found');

    const transactions = await this.prisma.transaction.findMany({
      where: {
        walletId: wallet.id,
        type: TransactionType.COURSE_EARNING,
      },

      select: {
        amount: true,
        payment: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalEarnings = transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0,
    );

    const earningsByCourse = Object.values(
      transactions.reduce(
        (acc, transaction) => {
          const course = transaction.payment?.course;

          if (!course) return acc;

          if (!acc[course.id]) {
            acc[course.id] = {
              courseId: course.id,
              courseTitle: course.title,
              earnings: 0,
            };
          }

          acc[course.id].earnings += Number(transaction.amount);

          return acc;
        },
        {} as Record<
          string,
          {
            courseId: string;
            courseTitle: string;
            earnings: number;
          }
        >,
      ),
    );

    return new ApiResponse(true, 'Teacher earnings retrieved successfully', {
      totalEarnings,
      earningsByCourse,
    });
  }

  // done
  async getMyWithdrawals(userId: string) {
    // check teacher
    const teacher = await this.instructorHelper.getTeacher(userId);

    // get wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
    });

    if (!wallet) throw new NotFoundException('Wallet not found');

    const withdrawals = await this.prisma.withdrawal.findMany({
      where: { teacherProfileId: teacher.id },
      select: {
        id: true,
        amount: true,
        status: true,
        rejectionReason: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new ApiResponse(true, 'Teacher withdrawals retrieved successfully', {
      withdrawals,
    });
  }
}
