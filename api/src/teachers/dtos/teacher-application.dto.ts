import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class TeacherApplicationDto {
  @ApiProperty({ type: String, description: 'The bio of the teacher' })
  @IsString()
  @IsNotEmpty()
  bio!: string;

  @ApiProperty({ type: String, description: 'The title of the teacher' })
  @IsString()
  title!: string;

  @ApiProperty({ type: String, description: 'The expertise of the teacher' })
  @IsString()
  @IsNotEmpty()
  expertise!: string;

  @ApiProperty({ type: String, description: 'The phone number of the teacher' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone!: string;
}
