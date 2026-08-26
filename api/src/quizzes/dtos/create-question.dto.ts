import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionOptionDto } from './create-question-option.dto.js';

export class CreateQuestionDto {
  @ApiProperty({ type: String, description: 'The text of the question' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({ type: Number, description: 'The order of the question' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  order!: number;

  @ApiProperty({
    type: () => CreateQuestionOptionDto,
    isArray: true,
    description: 'The options of the question',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  options!: CreateQuestionOptionDto[];
}
