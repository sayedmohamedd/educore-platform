import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class GradeAssignmentDto {
  @ApiProperty({ type: String, description: 'The submission ID' })
  @IsString()
  @IsNotEmpty()
  submissionId!: string;

  @ApiProperty({ type: Number, description: 'The grade of the assignment' })
  @IsNumber()
  @Min(0)
  @Max(100)
  grade!: number;

  @ApiProperty({ type: String, description: 'The feedback of the assignment' })
  @IsNotEmpty()
  @IsString()
  feedback!: string;
}
