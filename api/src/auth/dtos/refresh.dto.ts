import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ type: String, description: 'The refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken!: string;
}
