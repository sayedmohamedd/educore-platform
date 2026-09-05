/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { RejectionDto } from '../payments/dtos/reject-payment.dto.js';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto.js';
import { CreateCategoryDto } from '../categories/dto/create-category.dto.js';
import slugify from 'slugify';

@Injectable()
export class AdminService {
  constructor(readonly prisma: PrismaService) {}

  //   statistics
  async getStatistics() {}

  // payments
  async getAllPayments() {
    const payments = await this.prisma.payment.findMany({
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        rejectionReason: true,
        course: { select: { id: true, title: true } },
        user: { select: { id: true, fullName: true, email: true } },
        receiptFile: { select: { id: true, url: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return new ApiResponse(true, 'Payments retrieved successfully', {
      payments,
    });
  }

  async approvePayment(paymentId: string, adminId: string) {
    return await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
        include: { course: true }, // لازم نكون عاملين relation بين Payment و Course
      });

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      if (payment.status !== 'PENDING') {
        throw new ConflictException('Payment is not pending');
      }

      await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: 'APPROVED',
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

      await tx.transaction.create({
        data: {
          walletId: teacherWallet.id,
          paymentId: payment.id,
          amount: teacherAmount,
          type: 'COURSE_EARNING',
        },
      });

      return new ApiResponse(
        true,
        'Payment approved and course unlocked successfully',
      );
    });
  }

  async rejectPayment(paymentId: string, adminId: string, dto: RejectionDto) {
    await this.prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: 'REJECTED',
        adminId,
        rejectionReason: dto.rejectionReason,
      },
    });
    return new ApiResponse(false, 'Payment rejected');
  }

  //   Teachers
  async getTeachers() {
    const teachers = await this.prisma.teacherProfile.findMany({
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
    });
    return new ApiResponse(true, 'Teachers retrieved successfully', teachers);
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
      data: dto,
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

  async getAllCourses() {
    const courses = await this.prisma.course.findMany({
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
                avatar: true,
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
        sections: {
          select: {
            id: true,
            title: true,
            order: true,
            lessons: {
              select: {
                id: true,
                title: true,
                order: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return new ApiResponse(true, 'Courses retrieved successfully', { courses });
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
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
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
    });
    return new ApiResponse(true, 'Users retrieved successfully', { users });
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

  // async updateWallet(walletId: string, dto: UpdateWalletDto) {
  //   const wallet = await this.prisma.wallet.update({
  //     where: { id: walletId },
  //     data: dto,
  //   });
  //   return new ApiResponse(true, 'Wallet updated successfully', wallet);
  // }

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
