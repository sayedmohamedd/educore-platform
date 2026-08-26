import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ type: String, description: 'The course ID' })
  @IsString()
  @IsNotEmpty()
  courseId!: string;

  @ApiProperty({ type: Number, description: 'The amount of the payment' })
  @IsDecimal()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ type: String, description: 'The recipient ID' })
  @IsString()
  @IsNotEmpty()
  recipientId!: string;
}
