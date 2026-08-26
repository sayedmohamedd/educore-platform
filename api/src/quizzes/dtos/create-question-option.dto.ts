import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateQuestionOptionDto {
  @ApiProperty({ type: String, description: 'The text of the question option' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({
    type: Number,
    description: 'The order of the question option',
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  order!: number;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the question option is correct',
  })
  @IsBoolean()
  @IsNotEmpty()
  isCorrect!: boolean;
}
