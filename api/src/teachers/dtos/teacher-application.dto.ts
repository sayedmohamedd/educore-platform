import { IsPhoneNumber, IsString } from 'class-validator';

export class TeacherApplicationDto {
  @IsString()
  bio!: string;
  @IsString()
  title!: string;
  @IsString()
  expertise!: string;
  @IsString()
  @IsPhoneNumber()
  phone!: string;
}
