import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { CourseStatus } from '../../generated/prisma/client.js';
import { PaginationDto } from '../../common/pagination/pagination.dto.js';

export class CourseQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;
}
