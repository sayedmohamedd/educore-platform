import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({ type: String, description: 'The lesson ID' })
  @IsString()
  @IsNotEmpty()
  lessonId!: string;

  @ApiProperty({ type: String, description: 'The title of the assignment' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: String,
    description: 'The description of the assignment',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
    description: 'The due date of the assignment',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
