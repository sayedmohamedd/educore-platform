import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ApiResponse } from '../helper/APIResponse.js';

@Injectable()
export class TransactionsService {
  constructor(readonly prisma: PrismaService) {}

  async getAll() {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        payment: {
          include: { course: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return new ApiResponse(
      true,
      'Transactions fetched successfully',
      transactions,
    );
  }

  async getMyTransactions(userId: string) {
    // get teacher profile
    const profile = await this.prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    // get wallet
    const wallet = await this.prisma.wallet.findUnique({
      where: { teacherProfileId: profile.id },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    // get transactions
    const transactions = await this.prisma.transaction.findMany({
      where: { walletId: wallet.id },
      include: {
        payment: {
          include: { course: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return new ApiResponse(
      true,
      'Transactions fetched successfully',
      transactions,
    );
  }
}
