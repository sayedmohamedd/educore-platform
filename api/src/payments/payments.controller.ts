import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RejectionDto } from './dtos/reject-payment.dto.js';
import { CreatePaymentDto } from './dtos/create-payment.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { PaymentsService } from './payments.service.js';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}
  // Student Routes
  @Post()
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  createPayment(
    @Body() body: CreatePaymentDto,
    @Req() req: AuthenticatedRequest & { user: { userId: string } },
  ) {
    return this.paymentsService.create(req.user.userId, body);
  }

  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @Get('/my-payments')
  getPayments(@Req() req: AuthenticatedRequest & { user: { userId: string } }) {
    return this.paymentsService.getPayments(req.user.userId);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/:paymentId/approve')
  approvePayment(
    @Param('paymentId') paymentId: string,
    @Req() req: AuthenticatedRequest & { user: { userId: string } },
  ) {
    return this.paymentsService.approve(paymentId, req.user.userId);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/:paymentId/reject ')
  rejectPayment(
    @Body() body: RejectionDto,
    @Param('paymentId') paymentId: string,
  ) {
    return this.paymentsService.reject(paymentId, body);
  }
}
