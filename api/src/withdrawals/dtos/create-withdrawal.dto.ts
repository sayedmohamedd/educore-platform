import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateWithdrawalDto {
  @ApiProperty({ type: Number, description: 'The amount of the withdrawal' })
  @IsNumber()
  @Min(100)
  @Max(5000)
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({
    type: String,
    description: 'The bank details of the withdrawal',
  })
  @IsNotEmpty()
  @IsString()
  bankDetails!: string;
}
