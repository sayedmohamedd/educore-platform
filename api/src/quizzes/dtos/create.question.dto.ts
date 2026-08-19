import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionOptionDto } from './create-question-option.dto.js';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @Min(1)
  order!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  options!: CreateQuestionOptionDto[];
}
