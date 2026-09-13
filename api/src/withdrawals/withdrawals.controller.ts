import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { WithdrawalQueryDto } from './dtos/withdrawal-query.dto.js';

@Controller('withdrawals')
@UseGuards(JwtAuthGuard)
export class WithdrawalsController {
  constructor(readonly withdrawalsService: WithdrawalsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll(@Query() query: WithdrawalQueryDto) {
    return this.withdrawalsService.findAll(query);
  }

  // INSTRUCTOR
  @Post()
  @Roles(Role.INSTRUCTOR)
  @UseGuards(RolesGuard)
  create(
    @Req() req: AuthenticatedRequest & { user: { userId: string } },
    @Body() dto: CreateWithdrawalDto,
  ) {
    return this.withdrawalsService.create(req.user.userId, dto);
  }

  // ADMIN
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
