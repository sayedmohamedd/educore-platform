import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { InstructorHelperService } from './services/instructor-helper/instructor-helper.service.js';

@Module({
  imports: [PrismaModule],
  providers: [InstructorHelperService],
  exports: [InstructorHelperService],
})
export class CommonModule {}
