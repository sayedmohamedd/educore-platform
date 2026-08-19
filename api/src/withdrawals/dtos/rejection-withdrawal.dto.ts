import { IsNotEmpty, IsString } from 'class-validator';

export class RejectWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  rejectionReason!: string;
}
