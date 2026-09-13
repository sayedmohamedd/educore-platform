/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// Services
import { PrismaService } from '../prisma/prisma.service.js';
import { InstructorHelperService } from '../common/services/instructor-helper/instructor-helper.service.js';
// Helpers
import { ApiResponse } from '../helper/APIResponse.js';
import slugify from 'slugify';
import {
  getPagination,
  getPaginationMeta,
} from '../common/pagination/pagination.util.js';
// Enums
import {
  Prisma,
  PaymentStatus,
  TransactionType,
  Role,
} from '../generated/prisma/client.js';
// DTOs
import { RejectionDto } from '../payments/dtos/reject-payment.dto.js';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto.js';
import { CreateCategoryDto } from '../categories/dto/create-category.dto.js';
import { QueryDto } from '../payments/dtos/query-dto.js';
import { PaginationDto } from '../common/pagination/pagination.dto.js';
import { CourseQueryDto } from '../courses/dtos/course-query.dto.js';

@Injectable()
export class AdminService {
  constructor(
    readonly prisma: PrismaService,
    readonly instructorHelper: InstructorHelperService,
  ) {}

  //   statistics
  async getStatistics() {
    const [revenue, teachers, students, pendingPayments] = await Promise.all([
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: PaymentStatus.APPROVED },
      }),

      this.prisma.teacherProfile.count(),

      this.prisma.user.count({
        where: {
          role: Role.STUDENT,
        },
      }),

      this.prisma.payment.count({
        where: {
          status: PaymentStatus.PENDING,
        },
      }),
    ]);

    return new ApiResponse(true, 'Statistics retrieved successfully', {
      revenue: revenue._sum?.amount,
      teachers,
      students,
      pendingPayments,
    });
  }

  // payments
  async getAllPayments(query: QueryDto) {
    const { page = 1, limit = 10, search, status } = query;

    const { skip, take } = getPagination(page, limit);

    const where: Prisma.PaymentWhereInput = {
      ...(status && {
        status,
      }),

      ...(search && {
        OR: [
          {
            user: {
              fullName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            course: {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      }),
    };

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,

        select: {
          id: true,
          amount: true,
          status: true,
          createdAt: true,
          rejectionReason: true,

          course: {
            select: {
              id: true,
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

          receiptFile: {
            select: {
              id: true,
              url: true,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },

        skip,
        take,
      }),

      this.prisma.payment.count({
        where,
      }),
    ]);

    const meta = getPaginationMeta(page, limit, total);

    return new ApiResponse(true, 'Payments retrieved successfully', {
      payments,
      meta,
    });
  }

  async approvePayment(paymentId: string, adminId: string) {
    return await this.prisma.$transaction(async (tx) => {
      // check if payment exists
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
        include: { course: true },
      });

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      if (payment.status !== 'PENDING') {
        throw new ConflictException('Payment is not pending');
      }

      // check if user is already enrolled in this course
      const enrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: payment.userId,
            courseId: payment.courseId,
          },
        },
      });

      if (enrollment) {
        await this.prisma.payment.update({
          where: { id: paymentId },
          data: {
            status: PaymentStatus.REJECTED,
            rejectionReason: 'User already enrolled in this course',
            adminId,
          },
        });
        throw new ConflictException('User already enrolled in this course');
      }

      // update payment
      await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.APPROVED,
          adminId,
        },
      });

      // create enrollment
      await tx.enrollment.create({
        data: {
          userId: payment.userId,
          courseId: payment.courseId,
          paymentId: payment.id,
        },
      });

      // calculate teacher amount
      const teacherAmount = Number(payment.amount) * 0.7;

      const teacherWallet = await tx.wallet.findUnique({
        where: { teacherProfileId: payment.course.teacherId },
      });

      if (!teacherWallet) {
        throw new NotFoundException('Teacher wallet not found');
      }

      await tx.wallet.update({
        where: { id: teacherWallet.id },
        data: { balance: { increment: teacherAmount } },
      });

      const platformWallet = await tx.platformWallet.findMany({});

      await tx.platformWallet.update({
        where: { id: platformWallet[0].id },
        data: { balance: { increment: teacherAmount } },
      });

      // create transaction for teacher
      await tx.transaction.create({
        data: {
          walletId: teacherWallet.id,
          paymentId: payment.id,
          amount: teacherAmount,
          type: 'COURSE_EARNING',
        },
      });

      await tx.transaction.create({
        data: {
          walletId: platformWallet[0].id,
          paymentId: payment.id,
          amount: Number(payment.amount) - teacherAmount,
          type: TransactionType.PLATFORM_EARNING,
        },
      });

      return new ApiResponse(
        true,
        'Payment approved and course unlocked successfully',
      );
    });
  }

  async rejectPayment(paymentId: string, adminId: string, dto: RejectionDto) {
    await this.prisma.payment.findUniqueOrThrow({
      where: { id: paymentId, status: PaymentStatus.PENDING },
    });

    const payment = await this.prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: PaymentStatus.REJECTED,
        adminId,
        rejectionReason: dto.rejectionReason,
      },
    });
    return new ApiResponse(false, 'Payment rejected', payment);
  }

  //   Teachers
  async getTeachers(query: QueryDto) {
    const { page = 1, limit = 10, search } = query;

    const { skip, take } = getPagination(page, limit);

    const where: Prisma.TeacherProfileWhereInput = {
      ...(search && {
        OR: [
          {
            user: {
              fullName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      }),
    };

    const teachers = await this.prisma.teacherProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    const total = await this.prisma.teacherProfile.count({ where });

    const meta = getPaginationMeta(page, limit, total);

    return new ApiResponse(true, 'Teachers retrieved successfully', {
      teachers,
      meta,
    });
  }

  async getTeacherStudents(userId: string, query: QueryDto) {
    const teacher = await this.instructorHelper.getTeacher(userId);

    const { page = 1, limit = 10, search } = query;

    const { skip, take } = getPagination(page, limit);

    const where: Prisma.UserWhereInput = {
      ...(search && {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const students = await this.prisma.user.findMany({
      where: {
        role: Role.STUDENT,
        enrollments: {
          some: {
            course: {
              teacherId: teacher.id,
            },
          },
        },
        ...where,
      },

      select: {
        id: true,
        fullName: true,
        email: true,

        enrollments: {
          where: {
            course: {
              teacherId: teacher.id,
            },
          },

          select: {
            enrolledAt: true,
          },

          orderBy: {
            enrolledAt: 'asc',
          },
        },

        _count: {
          select: {
            enrollments: {
              where: {
                course: {
                  teacherId: teacher.id,
                },
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },

      skip,
      take,
    });

    const total = await this.prisma.user.count({
      where: {
        role: Role.STUDENT,
        enrollments: {
          some: {
            course: {
              teacherId: teacher.id,
            },
          },
        },
        ...where,
      },
    });

    const meta = getPaginationMeta(page, limit, total);

    return new ApiResponse(true, 'Students retrieved successfully', {
      students,
      meta,
    });
  }

  async getTeacherStatistics(userId: string, teacherId: string) {
    const students = await this.getTeacherStudents(userId, {});

    const courses = await this.prisma.course.findMany({
      where: { teacherId },
    });

    const totalRevenue = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacherId },
      select: { balance: true },
    });

    return new ApiResponse(true, 'Statistics retrieved successfully', {
      courses: courses.length,
      students: students.data?.students.length,
      totalRevenue,
    });
  }

  async approveTeacher(teacherId: string) {
    // check if teacher is exists and pending approval or not
    const profile = await this.prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    });

    if (!profile || profile.status !== 'PENDING') {
      throw new NotFoundException('Teacher not found');
    }

    const transaction = await this.prisma.$transaction(async (tx) => {
      const updatedProfile = await tx.teacherProfile.update({
        where: {
          id: teacherId,
          status: 'PENDING',
        },
        data: { status: 'APPROVED' },
      });

      // update user role
      await tx.user.update({
        where: { id: profile.userId },
        data: { role: 'INSTRUCTOR' },
      });

      // create wallet
      await tx.wallet.create({
        data: { teacherProfileId: profile.id },
      });

      return { updatedProfile };
    });

    return new ApiResponse(
      true,
      'Teacher approved successfully',
      transaction.updatedProfile,
    );
  }

  async rejectTeacher(teacherId: string) {
    const profile = await this.prisma.teacherProfile.update({
      where: {
        id: teacherId,
        status: 'PENDING',
      },
      data: {
        status: 'REJECTED',
      },
    });

    return new ApiResponse(true, 'Teacher rejected successfully', profile);
  }

  //   Categories
  async createCategory(dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: { name: dto.name, slug: slugify(dto.name) },
    });
    return new ApiResponse(true, 'Category created successfully', category);
  }

  async updateCategory(categoryId: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id: categoryId },
      data: { ...dto, slug: dto.name && slugify(dto.name) },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });
    return new ApiResponse(true, 'Category updated successfully', category);
  }

  async deleteCategory(categoryId: string) {
    const category = await this.prisma.category.delete({
      where: { id: categoryId },
    });
    return new ApiResponse(true, 'Category deleted successfully', category);
  }

  // Courses

  async getAllCourses(query: CourseQueryDto) {
    const { page = 1, limit = 10, search, status } = query;
    const title = search && search?.split('+').join(' ');
    const { skip, take } = getPagination(page, limit);

    const where: Prisma.CourseWhereInput = {
      ...(status && {
        status,
      }),

      ...(search && {
        OR: [
          {
            slug: {
              contains: title,
              mode: 'insensitive',
            },
          },
          {
            teacher: {
              user: {
                fullName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      }),
      // {
      //   teacher: {
      //     user: {
      //       email: {
      //         contains: search,
      //         mode: 'insensitive',
      //       },
      //     },
      //   },
      // },
      // {
      //   categories: {
      //     some: {
      //       category: {
      //         name: {
      //           contains: search,
      //           mode: 'insensitive',
      //         },
      //       },
      //     },
      //   },
      // },
      //   ],
      // }),
    };

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,

        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          price: true,
          status: true,
          duration: true,
          createdAt: true,

          thumbnail: {
            select: {
              id: true,
              url: true,
            },
          },

          teacher: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                  avatar: {
                    select: {
                      id: true,
                      url: true,
                    },
                  },
                },
              },
            },
          },

          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },

          // sections: {
          //   select: {
          //     id: true,
          //     title: true,
          //     order: true,
          //     lessons: {
          //       select: {
          //         id: true,
          //         title: true,
          //         order: true,
          //       },
          //     },
          //   },
          // },
        },

        orderBy: {
          updatedAt: 'desc',
        },

        skip,
        take,
      }),

      this.prisma.course.count({
        where,
      }),
    ]);

    const meta = getPaginationMeta(page, limit, total);

    const formattedCourses = courses.map((course) => ({
      ...course,
      categories: course.categories.map((cat) => cat.category),
    }));

    return new ApiResponse(true, 'Courses retrieved successfully', {
      courses: formattedCourses,
      meta,
    });
  }

  async approveCourse(courseId: string) {
    if (!courseId) throw new NotFoundException('Course not found');

    const course = await this.prisma.course.update({
      where: { id: courseId },
      data: { status: 'APPROVED' },
    });

    return new ApiResponse(true, 'Course approved successfully', course);
  }

  async rejectCourse(courseId: string) {
    if (!courseId) throw new NotFoundException('Course not found');
    const course = await this.prisma.course.update({
      where: { id: courseId },
      data: { status: 'REJECTED' },
    });
    return new ApiResponse(true, 'Course rejected successfully', course);
  }

  // Users
  async getAllUsers(query: QueryDto) {
    const { page = 1, limit = 10, search } = query;

    const where: Prisma.UserWhereInput = {
      ...(search && {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
      role: 'STUDENT',
    };

    const { skip, take } = getPagination(page, limit);

    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        email: true,
        avatar: {
          select: {
            id: true,
            url: true,
          },
        },
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    const usersCount = await this.prisma.user.count({
      where: { role: 'STUDENT' },
    });

    const meta = getPaginationMeta(page, limit, usersCount);
    return new ApiResponse(true, 'Users retrieved successfully', {
      users,
      meta,
    });
  }

  async updateUser(userId: string, dto: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User Not Found');

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return new ApiResponse(true, 'User Updated Successfully', updatedUser);
  }

  // Wallets
  async getWallets() {
    const wallets = await this.prisma.wallet.findMany();
    return new ApiResponse(true, 'Wallets retrieved successfully', wallets);
  }

  async getPlatformWalletAndTransactions(query: PaginationDto) {
    const { page = 1, limit = 10 } = query;

    const { skip, take } = getPagination(page, limit);

    const [wallet, transactions] = await Promise.all([
      this.prisma.platformWallet.findMany({
        select: {
          id: true,
          balance: true,
        },
      }),

      this.prisma.transaction.findMany({
        select: {
          id: true,
          amount: true,
          type: true,
          createdAt: true,
          withdrawalId: true,
          payment: {
            select: {
              id: true,
              amount: true,
              status: true,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },

        skip,
        take,
      }),
    ]);

    if (!wallet[0]) throw new NotFoundException('Wallet not found');

    const totalTransactions = await this.prisma.transaction.findMany();

    const totalEarnings = totalTransactions
      .filter(
        (transaction) => transaction.type === TransactionType.COURSE_EARNING,
      )
      .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

    const totalRefunds = totalTransactions
      .filter((transaction) => transaction.type === TransactionType.REFUND)
      .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

    const totalWithdrawals = totalTransactions
      .filter((transaction) => transaction.type === TransactionType.WITHDRAWAL)
      .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

    const meta = getPaginationMeta(page, limit, transactions.length);

    return new ApiResponse(true, 'Wallets retrieved successfully', {
      wallet: wallet[0],
      transactions,
      stats: {
        totalEarnings,
        totalRefunds,
        totalWithdrawals,
      },
      meta,
    });
  }

  async createWallet(teacherProfileId: string) {
    const wallet = await this.prisma.wallet.create({
      data: { teacherProfileId },
    });
    return new ApiResponse(true, 'Wallet created successfully', wallet);
  }

  async getPlatformWallet() {
    const wallet = await this.prisma.platformWallet.findMany({
      select: {
        id: true,
        balance: true,
        transactions: {
          select: {
            id: true,
            amount: true,
            type: true,
            createdAt: true,
            payment: {
              select: {
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return new ApiResponse(true, 'Wallet retrieved successfully', wallet);
  }
}
