import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/pagination/pagination.dto.js';
import { WithdrawalStatus } from '../../generated/prisma/enums.js';

export class WithdrawalQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  teacherId?: string;

  @IsOptional()
  @IsEnum(WithdrawalStatus)
  status?: WithdrawalStatus;
}
