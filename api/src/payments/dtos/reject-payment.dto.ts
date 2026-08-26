import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RejectionDto {
  @ApiProperty({ type: String, description: 'The rejection reason' })
  @IsString()
  @IsNotEmpty()
  rejectionReason!: string;
}
