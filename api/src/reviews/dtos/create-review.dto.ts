import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ type: Number, description: 'The rating of the review' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiProperty({ type: String, description: 'The comment of the review' })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiProperty({ type: String, description: 'The course ID' })
  @IsString()
  @IsNotEmpty()
  courseId!: string;
}
