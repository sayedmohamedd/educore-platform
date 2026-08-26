import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ type: String, description: 'The full name of the user' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ type: String, description: 'The email of the user' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: String, description: 'The password of the user' })
  @IsOptional()
  @IsString()
  password?: string;
}
