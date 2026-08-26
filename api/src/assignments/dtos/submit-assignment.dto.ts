import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitAssignmentDto {
  @ApiProperty({ type: String, description: 'The content of the submission' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({ type: String, description: 'The file ID' })
  @IsNotEmpty()
  @IsString()
  fileId!: string;
}
