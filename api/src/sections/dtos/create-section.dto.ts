import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({ type: String, description: 'The title of the section' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: Number, description: 'The order of the section' })
  @IsInt()
  @Min(0)
  order!: number;
}
