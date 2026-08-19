import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;

  @IsInt()
  @Min(0)
  order!: number;

  @IsOptional()
  @IsBoolean()
  isFree?: boolean;
}
