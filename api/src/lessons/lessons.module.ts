import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller.js';
import { LessonsService } from './lessons.service.js';
import { InstructorHelperService } from '../common/services/instructor-helper/instructor-helper.service.js';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, InstructorHelperService],
})
export class LessonsModule {}
