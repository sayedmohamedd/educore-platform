import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ type: String, description: 'The title of the lesson' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: String, description: 'The slug of the lesson' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ type: String, description: 'The description of the lesson' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, description: 'The video URL of the lesson' })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({ type: Number, description: 'The duration of the lesson' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  duration!: number;

  @ApiProperty({ type: Number, description: 'The order of the lesson' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  order!: number;

  @ApiProperty({ type: Boolean, description: 'Whether the lesson is free' })
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isFree?: boolean;
}
