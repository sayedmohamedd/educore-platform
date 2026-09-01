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
@Roles(Role.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  createPayment(
    @Body() body: CreatePaymentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.paymentsService.create(req.user.userId, body);
  }

  @Get('/me')
  getMyPayments(@Req() req: AuthenticatedRequest) {
    return this.paymentsService.getMyPayments(req.user.userId);
  }

  @Get('/:paymentId')
  getPaymentById(
    @Param('paymentId') paymentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.paymentsService.getPayment(req.user.userId, paymentId);
  }
}
