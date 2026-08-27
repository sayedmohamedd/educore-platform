import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { TeacherApplicationDto } from './dtos/teacher-application.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { InstructorHelperService } from '../common/services/instructor-helper/instructor-helper.service.js';
import { AssignCategoryDto } from '../courses/dtos/assign-category.dto.js';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    readonly instructorHelper: InstructorHelperService,
  ) {}

  // Find All Teachers - done
  async getAll() {
    const teachers = await this.prisma.teacherProfile.findMany({
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
    });

    return new ApiResponse(true, 'Teachers retrieved successfully', {
      teachers,
    });
  }

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
          include: {
            categories: {
              include: {
                category: {
                  select: { id: true, name: true },
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

    return new ApiResponse(true, 'Teachers retrieved successfully', teacher);
  }

  async getPublicCourses(teacherId: string) {
    const courses = await this.prisma.course.findMany({
      where: {
        teacherId,
        status: 'PUBLISHED',
      },
      include: {
        categories: {
          include: {
            category: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    return new ApiResponse(true, 'Courses retrieved successfully', { courses });
  }

  // Apply for Teacher - done
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

  // Find Teacher - done
  async getProfile(userId: string) {
    const profile = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Teacher profile not found');
    }

    return new ApiResponse(
      true,
      'Teacher profile retrieved successfully',
      profile,
    );
  }

  async update(userId: string, dto: TeacherApplicationDto) {
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

  // Find Teacher - done
  async getPublicProfile(teacherId: string) {
    const profile = await this.prisma.teacherProfile.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    if (!profile || profile.status !== 'APPROVED') {
      throw new NotFoundException('Teacher not found');
    }

    return new ApiResponse(
      true,
      'Teacher profile retrieved successfully',
      profile,
    );
  }

  // Find Teacher Students
  async getTeacherStudents(userId: string) {
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
    });

    return new ApiResponse(true, 'Students retrieved successfully', {
      students,
    });
  }

  // Find Teacher Courses - done
  async getMyCourses(userId: string) {
    // check if teacher is exists and approved or not
    const teacher = await this.instructorHelper.getTeacher(userId);

    // get teacher courses
    const rawCourses = await this.prisma.course.findMany({
      where: { teacherId: teacher.id, status: 'PUBLISHED' },
      include: {
        categories: {
          include: {
            category: {
              select: { id: true, name: true }, // هات الـ id والـ name من جدول الـ category
            },
          },
        },
      },
    });

    console.log(teacher);
    console.log(rawCourses);

    // format
    const courses = rawCourses.map((course) => ({
      ...course,
      categories: course.categories.map((item) => ({
        id: item.category.id,
        name: item.category.name,
      })),
    }));

    return new ApiResponse(true, 'Courses retrieved successfully', { courses });
  }

  // Find Course Students
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
    });

    return new ApiResponse(true, 'Students retrieved successfully', {
      students,
    });
  }

  // teacher statistics - done
  async getTeacherStatistics(userId: string, teacherId: string) {
    const students = await this.getTeacherStudents(userId);

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

    console.log('course', course);

    return new ApiResponse(true, 'Students retrieved successfully', course);
  }

  // wallet - done
  async getWallet(userId: string) {
    // check teacher
    const teacher = await this.instructorHelper.getTeacher(userId);

    // get wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return new ApiResponse(true, 'Wallet retrieved successfully', wallet);
  }

  // wallet transactions - done
  async getTeacherWalletTransactions(userId: string) {
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

  async getTeacherWalletEarnings(userId: string) {
    const teacher = await this.instructorHelper.getTeacher(userId);

    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacher.id },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const transactions = await this.prisma.transaction.findMany({
      where: {
        walletId: wallet.id,
        type: 'COURSE_EARNING',
      },
      include: {
        payment: {
          include: {
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

  async getTeacherWalletWithdrawals(userId: string) {
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
      where: {
        walletId: wallet.id,
        type: 'WITHDRAWAL',
      },
      include: {
        payment: {
          include: {
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

    return new ApiResponse(true, 'Teacher withdrawals retrieved successfully', {
      transactions,
    });
  }

  async assignCategoryToCourse(
    userId: string,
    courseId: string,
    dto: AssignCategoryDto,
  ) {
    //
    await this.instructorHelper.getTeacherCourse(userId, courseId);

    const updatedCourse = await this.prisma.course.update({
      where: { id: courseId },
      data: {
        categories: {
          create: {
            category: {
              connect: {
                id: dto.categoryId,
              },
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return new ApiResponse(
      true,
      'Category Assigned Successfully',
      updatedCourse,
    );
  }
}
