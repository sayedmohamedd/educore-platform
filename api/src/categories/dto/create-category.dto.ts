import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'The name of the category' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ type: String, description: 'The description of the category' })
  @IsOptional()
  @IsString()
  description?: string;
}
