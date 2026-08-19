import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  courseId!: string;

  @IsDecimal()
  @IsNotEmpty()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  recipientId!: string;
}
