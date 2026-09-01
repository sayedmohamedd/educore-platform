import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaymentDto } from './dtos/create-payment.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { PaymentStatus } from '../generated/prisma/client.js';

@Injectable()
export class PaymentsService {
  constructor(readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePaymentDto) {
    // check if course is exsits and published
    const course = await this.getCourse(dto.courseId);

    // check if amount matches course price
    if (Number(course.price) !== dto.amount) {
      throw new BadRequestException('Amount does not match course price');
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
      throw new ForbiddenException('You are already enrolled in this course');
    }

    // check if user already has a pending payment request
    const pendingPayment = await this.prisma.payment.findFirst({
      where: {
        userId,
        courseId: dto.courseId,
      },
    });

    if (pendingPayment?.status === PaymentStatus.PENDING) {
      throw new ConflictException(
        'You already have a pending payment request for this course',
      );
    }

    if (pendingPayment?.status === PaymentStatus.APPROVED) {
      throw new ConflictException(
        'You have already completed the payment for this course',
      );
    }

    // Create Payment
    const payment = await this.prisma.payment.create({
      data: {
        userId,
        courseId: dto.courseId,
        amount: course.price,
        receiptFileId: dto.recipientId,
      },
    });

    return new ApiResponse(true, 'Payment created successfully', payment);
  }

  async getPayment(userId: string, paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id: paymentId,
        userId,
      },
    });

    if (!payment) throw new Error('Payment not found');

    return new ApiResponse(true, 'Payment fetched successfully', payment);
  }

  async getMyPayments(userId: string) {
    const payments = await this.prisma.payment.findMany({
      where: {
        userId,
      },
    });
    return new ApiResponse(true, 'Payments fetched successfully', payments);
  }

  // Helper methods
  private async getCourse(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== 'PUBLISHED') {
      throw new ForbiddenException('Course is not published');
    }

    return course;
  }
}
