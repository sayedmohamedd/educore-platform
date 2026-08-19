import { IsEmail, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;
}
