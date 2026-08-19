import { IsString } from 'class-validator';

export class RejectionDto {
  @IsString()
  rejectionReason!: string;
}
