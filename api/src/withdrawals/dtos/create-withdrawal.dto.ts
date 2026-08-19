import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateWithdrawalDto {
  @IsNumber()
  @Min(100)
  @Max(5000)
  @IsNotEmpty()
  amount!: number;

  @IsNotEmpty()
  @IsString()
  bankDetails!: string;
}
