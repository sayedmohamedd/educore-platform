import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/client.js';
import { TransactionQueryDto } from './dtos/transaction-query.dto.js';

@Controller('transactions')
export class TransactionsController {
  constructor(readonly transactionsService: TransactionsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getTransactions(@Query() query: TransactionQueryDto) {
    return this.transactionsService.getAll(query);
  }
}
