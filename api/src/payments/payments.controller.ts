import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create-payment.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { PaymentsService } from './payments.service.js';
import { Role } from '../generated/prisma/client.js';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  createPayment(
    @Body() body: CreatePaymentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.paymentsService.create(req.user.userId, body);
  }

  @Get('/:paymentId')
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  getPaymentById(
    @Param('paymentId') paymentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.paymentsService.getPayment(req.user.userId, paymentId);
  }

  @Get('/my')
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  getMyPayments(@Req() req: AuthenticatedRequest) {
    return this.paymentsService.getMyPayments(req.user.userId);
  }
}
