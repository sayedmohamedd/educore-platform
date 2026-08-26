import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto.js';

export class CreateQuizDto {
  @ApiProperty({ type: String, description: 'The lesson ID' })
  @IsString()
  @IsNotEmpty()
  lessonId!: string;

  @ApiProperty({ type: String, description: 'The title of the quiz' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: () => CreateQuestionDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions!: CreateQuestionDto[];
}
