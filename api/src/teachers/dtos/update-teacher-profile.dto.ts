import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateTeacherProfileDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  expertise?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
