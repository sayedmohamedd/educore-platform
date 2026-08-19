import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaymentDto } from './dtos/create-payment.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { RejectionDto } from './dtos/reject-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(readonly prisma: PrismaService) {}
  async create(userId: string, dto: CreatePaymentDto) {
    // check if course is exsits and published
    const course = await this.prisma.course.findUnique({
      where: {
        id: dto.courseId,
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    if (course.status !== 'PUBLISHED') {
      throw new Error('Course is not published');
    }

    // check if amount matches course price
    if (Number(course.price) !== dto.amount) {
      throw new Error('Amount does not match course price');
    }

    // check if user is enrolled in the course
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: dto.courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new Error('You are already enrolled in this course');
    }

    // check if user already has a pending payment request
    const pendingPayment = await this.prisma.payment.findFirst({
      where: {
        userId,
        courseId: dto.courseId,
        status: 'PENDING',
      },
    });

    if (pendingPayment) {
      throw new Error(
        'You already have a pending payment request for this course',
      );
    }

    const payment = await this.prisma.payment.create({
      data: {
        userId,
        courseId: dto.courseId,
        amount: dto.amount,
        receiptFileId: dto.recipientId,
      },
    });

    return new ApiResponse(true, 'Payment created successfully', payment);
  }

  async getPayments(userId: string) {
    const payments = await this.prisma.payment.findMany({
      where: {
        userId,
      },
    });
    return new ApiResponse(true, 'Payments fetched successfully', payments);
  }

  async approve(paymentId: string, adminId: string) {
    return await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
        include: { course: true }, // لازم نكون عاملين relation بين Payment و Course
      });

      if (!payment) {
        throw new Error('Payment not found');
      }

      if (payment.status !== 'PENDING') {
        throw new Error('Payment is not pending');
      }

      await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: 'APPROVED',
          adminId: adminId,
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

      if (teacherWallet) {
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
      }

      return new ApiResponse(
        true,
        'Payment approved and course unlocked successfully',
      );
    });
  }

  async reject(paymentId: string, dto: RejectionDto) {
    await this.prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: 'REJECTED',
        rejectionReason: dto.rejectionReason,
      },
    });
    return new ApiResponse(false, 'Payment rejected');
  }
}
