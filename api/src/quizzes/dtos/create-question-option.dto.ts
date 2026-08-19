import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateQuestionOptionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsInt()
  @Min(1)
  order!: number;

  @IsBoolean()
  isCorrect!: boolean;
}
