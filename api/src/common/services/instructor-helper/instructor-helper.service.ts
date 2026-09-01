import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';

import { TeacherStatus } from '../../../generated/prisma/client.js';

@Injectable()
export class InstructorHelperService {
  constructor(readonly prisma: PrismaService) {}

  //   check teacher exists and approved or not
  async getTeacher(userId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (teacher.status !== TeacherStatus.APPROVED) {
      throw new ForbiddenException('Teacher is not approved');
    }

    return teacher;
  }

  //   check course and teacher Authorization
  async getTeacherCourse(userId: string, courseId: string) {
    const teacher = await this.getTeacher(userId);

    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacher.id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async recalculateCourseDuration(courseId: string) {
    const result = await this.prisma.lesson.aggregate({
      where: {
        section: {
          courseId,
        },
      },
      _sum: {
        duration: true,
      },
    });

    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        duration: result._sum.duration ?? 0,
      },
    });
  }
}
