import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({
    type: String,
    description: 'The URL of the media',
  })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({
    type: String,
    description: 'The public ID of the media',
  })
  @IsString()
  @IsNotEmpty()
  publicId!: string;

  @ApiProperty({
    type: String,
    description: 'The resource type of the media',
  })
  @IsString()
  @IsNotEmpty()
  resourceType!: string;

  @ApiProperty({
    type: String,
    description: 'The filename of the media',
  })
  @IsString()
  @IsNotEmpty()
  filename!: string;

  @ApiProperty({
    type: Number,
    description: 'The size of the media',
  })
  @IsNumber()
  @IsNotEmpty()
  size!: number;

  @ApiProperty({
    type: String,
    description: 'The MIME type of the media',
  })
  @IsString()
  @IsNotEmpty()
  mimeType!: string;
}
