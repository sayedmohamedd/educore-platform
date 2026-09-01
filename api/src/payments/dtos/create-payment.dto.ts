import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ type: String, description: 'The course ID' })
  @IsString()
  @IsNotEmpty()
  courseId!: string;

  @ApiProperty({ type: Number, description: 'The amount of the payment' })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ type: String, description: 'The recipient ID' })
  @IsString()
  @IsNotEmpty()
  recipientId!: string;

  @ApiProperty({ type: String, description: 'The Coupon Code' })
  @IsString()
  @IsOptional()
  couponCode?: string;

  @ApiProperty({ type: String, description: 'The transaction ID' })
  @IsString()
  @IsOptional()
  transactionId?: string;
}
