import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from '../../auth/dtos/register.dto.js';

export class UpdateProfileDto extends PartialType(RegisterDto) {}
