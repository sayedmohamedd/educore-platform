import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RejectWithdrawalDto {
  @ApiProperty({ type: String, description: 'The rejection reason' })
  @IsString()
  @IsNotEmpty()
  rejectionReason!: string;
}
