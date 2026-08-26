import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Role } from '../generated/prisma/client.js';
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(readonly transactionsService: TransactionsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getTransactions() {
    return this.transactionsService.getAll();
  }

  @Get('me')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  getMyTransactions(
    @Req() req: AuthenticatedRequest & { user: { userId: string } },
  ) {
    return this.transactionsService.getMyTransactions(req.user.userId);
  }
}
