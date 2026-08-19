import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWithdrawalDto } from './dtos/create-withdrawal.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { RejectWithdrawalDto } from './dtos/rejection-withdrawal.dto.js';

@Injectable()
export class WithdrawalsService {
  constructor(readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateWithdrawalDto) {
    const teacherProfile = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!teacherProfile) {
      throw new Error('Teacher profile not found');
    }

    if (teacherProfile.status !== 'APPROVED') {
      throw new Error('Teacher profile is not approved');
    }

    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacherProfile.id },
    });

    if (!wallet) {
      throw new Error('Teacher profile wallet not found');
    }

    if (Number(wallet.balance) < dto.amount) {
      throw new Error('Teacher profile balance is not enough');
    }

    const withdrawal = await this.prisma.withdrawal.create({
      data: {
        teacherProfileId: teacherProfile.id,
        amount: dto.amount,
        bankDetails: dto.bankDetails,
      },
    });

    return new ApiResponse(true, 'Withdrawal created successfully', withdrawal);
  }

  async findAll() {
    const withdrawals = await this.prisma.withdrawal.findMany({
      include: {
        teacherProfile: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return new ApiResponse(
      true,
      'Withdrawals retrieved successfully',
      withdrawals,
    );
  }

  async myWithdrawals(userId: string) {
    const teacherProfile = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
        status: 'APPROVED',
      },
    });

    if (!teacherProfile) {
      throw new Error('Teacher profile not found');
    }

    const withdrawals = await this.prisma.withdrawal.findMany({
      where: { teacherProfileId: teacherProfile.id },
      orderBy: { createdAt: 'desc' },
    });

    return new ApiResponse(
      true,
      'Withdrawals retrieved successfully',
      withdrawals,
    );
  }

  async approveByAdmin(withdrawalId: string) {
    const withdrawal = await this.prisma.withdrawal.findUnique({
      where: { id: withdrawalId },
      include: {
        teacherProfile: {
          include: { wallet: true },
        },
      },
    });

    if (!withdrawal) {
      throw new Error('Withdrawal not found');
    }

    if (withdrawal.status !== 'PENDING') {
      throw new Error('Withdrawal is not pending');
    }

    const wallet = withdrawal.teacherProfile.wallet;

    if (!wallet) {
      throw new Error('Teacher wallet not found');
    }

    if (Number(wallet.balance) < Number(withdrawal.amount)) {
      throw new Error('Teacher profile balance is not enough');
    }

    // 3. تنفيذ العمليات المالية داخل Transaction لضمان الأمان التام
    const result = await this.prisma.$transaction(async (tx) => {
      // أ. تحديث حالة طلب السحب إلى APPROVED
      const updatedWithdrawal = await tx.withdrawal.update({
        where: { id: withdrawalId },
        data: { status: 'APPROVED' },
      });

      // ب. خصم المبلغ من محفظة المدرس
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            decrement: withdrawal.amount,
          },
        },
      });

      // ج. تسجيل الحركة في دفتر الأستاذ (Transaction Ledger)
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          withdrawalId: withdrawal.id,
          amount: withdrawal.amount,
          type: 'WITHDRAWAL',
        },
      });

      return updatedWithdrawal;
    });

    return new ApiResponse(
      true,
      'Withdrawal approved and balance deducted successfully',
      result,
    );
  }

  async rejectByAdmin(withdrawalId: string, dto: RejectWithdrawalDto) {
    const withdrawal = await this.prisma.withdrawal.findUnique({
      where: { id: withdrawalId },
    });

    if (!withdrawal) {
      throw new Error('Withdrawal not found');
    }

    if (withdrawal.status !== 'PENDING') {
      throw new Error('Withdrawal is not pending');
    }

    const updatedWithdrawal = await this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'REJECTED',
        rejectionReason: dto.rejectionReason,
      },
    });

    return new ApiResponse(
      true,
      'Withdrawal rejected successfully',
      updatedWithdrawal,
    );
  }
}
