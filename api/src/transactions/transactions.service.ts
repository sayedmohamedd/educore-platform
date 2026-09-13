import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ApiResponse } from '../helper/APIResponse.js';
import {
  getPagination,
  getPaginationMeta,
} from '../common/pagination/pagination.util.js';
import { TransactionQueryDto } from './dtos/transaction-query.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class TransactionsService {
  constructor(readonly prisma: PrismaService) {}

  async getAll(query: TransactionQueryDto) {
    const { page = 1, limit = 10, status } = query;

    const where: Prisma.TransactionWhereInput = {
      ...(status && {
        type: status,
      }),
    };
    const { skip, take } = getPagination(page, limit);

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        select: {
          id: true,
          type: true,
          amount: true,
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
              course: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    const meta = getPaginationMeta(page, limit, total);

    return new ApiResponse(true, 'Transactions fetched successfully', {
      transactions,
      meta,
    });
  }
}
