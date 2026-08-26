import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { WithdrawalsService } from './withdrawals.service.js';
import { CreateWithdrawalDto } from './dtos/create-withdrawal.dto.js';
import { RejectWithdrawalDto } from './dtos/rejection-withdrawal.dto.js';
import { Role } from '../generated/prisma/client.js';

@Controller('withdrawals')
@UseGuards(JwtAuthGuard)
export class WithdrawalsController {
  constructor(readonly withdrawalsService: WithdrawalsService) {}
  //
  @Post()
  create(
    @Req() req: AuthenticatedRequest & { user: { userId: string } },
    @Body() dto: CreateWithdrawalDto,
  ) {
    return this.withdrawalsService.create(req.user.userId, dto);
  }

  //
  @Get('me')
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  me(@Req() req: AuthenticatedRequest & { user: { userId: string } }) {
    return this.withdrawalsService.myWithdrawals(req.user.userId);
  }

  //
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.withdrawalsService.findAll();
  }

  @Patch(':id/approve')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  approve(@Param('id') id: string) {
    return this.withdrawalsService.approveByAdmin(id);
  }

  @Patch(':id/reject')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  reject(@Param('id') id: string, @Body() dto: RejectWithdrawalDto) {
    return this.withdrawalsService.rejectByAdmin(id, dto);
  }
}
