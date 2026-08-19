import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GradeAssignmentDto {
  @IsString()
  submissionId!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  grade!: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
