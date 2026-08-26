import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: String, description: 'The full name of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName!: string;

  @ApiProperty({ type: String, description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ type: String, description: 'The password of the user' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password!: string;
}
