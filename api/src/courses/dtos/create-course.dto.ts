import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ type: String, description: 'The title of the course' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: String, description: 'The description of the course' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: Number, description: 'The price of the course' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ type: String, description: 'The thumbnail of the course' })
  @IsOptional()
  @IsString()
  thumbnailId?: string;

  @ApiProperty({ type: String, description: 'The category IDs of the course' })
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];
}
