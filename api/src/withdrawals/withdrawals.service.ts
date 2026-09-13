import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWithdrawalDto } from './dtos/create-withdrawal.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { RejectWithdrawalDto } from './dtos/rejection-withdrawal.dto.js';
import {
  TransactionType,
  WithdrawalStatus,
} from '../generated/prisma/enums.js';
import { WithdrawalQueryDto } from './dtos/withdrawal-query.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import {
  getPagination,
  getPaginationMeta,
} from '../common/pagination/pagination.util.js';

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
      throw new NotFoundException('Teacher profile not found');
    }

    if (teacherProfile.status !== 'APPROVED') {
      throw new BadRequestException('Teacher profile is not approved');
    }

    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: teacherProfile.id },
    });

    if (!wallet) {
      throw new NotFoundException('Teacher profile wallet not found');
    }

    if (Number(wallet.balance) < dto.amount) {
      throw new BadRequestException('Teacher profile balance is not enough');
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

  async findAll(query: WithdrawalQueryDto) {
    const { page = 1, limit = 10 } = query;

    const { skip, take } = getPagination(page, limit);

    const where: Prisma.WithdrawalWhereInput = {
      ...(query.status && {
        status: query.status,
      }),
      ...(query.teacherId && {
        teacherProfileId: query.teacherId,
      }),
    };

    const [withdrawals, total] = await Promise.all([
      this.prisma.withdrawal.findMany({
        where,
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
        skip,
        take,
      }),
      this.prisma.withdrawal.count({ where }),
    ]);
    const meta = getPaginationMeta(page, limit, total);
    return new ApiResponse(true, 'Withdrawals retrieved successfully', {
      withdrawals,
      meta,
    });
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

    if (!withdrawal) throw new NotFoundException('Withdrawal not found');

    if (withdrawal.status !== WithdrawalStatus.PENDING) {
      throw new BadRequestException('Withdrawal is not pending');
    }

    const wallet = withdrawal.teacherProfile.wallet;

    if (!wallet) throw new NotFoundException('Teacher wallet not found');

    if (Number(wallet.balance) < Number(withdrawal.amount)) {
      throw new BadRequestException('Teacher profile balance is not enough');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedWithdrawal = await tx.withdrawal.update({
        where: { id: withdrawalId },
        data: { status: WithdrawalStatus.APPROVED },
      });

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            decrement: withdrawal.amount,
          },
        },
      });

      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          withdrawalId: withdrawal.id,
          amount: withdrawal.amount,
          type: TransactionType.WITHDRAWAL,
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

    if (!withdrawal) throw new NotFoundException('Withdrawal not found');

    if (withdrawal.status !== WithdrawalStatus.PENDING) {
      throw new BadRequestException('Withdrawal is not pending');
    }

    const updatedWithdrawal = await this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: WithdrawalStatus.REJECTED,
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
