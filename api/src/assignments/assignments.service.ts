import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAssignmentDto } from './dtos/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dtos/update-assignment.dto.js';
import { SubmitAssignmentDto } from './dtos/submit-assignment.dto.js';
import { GradeAssignmentDto } from './dtos/grade-assignment.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // Find All Assignments & Submissions for a User
  // =========================

  async findAll(userId: string) {
    const assignments = await this.prisma.assignment.findMany({
      where: {
        lesson: {
          section: {
            course: {
              enrollments: {
                some: {
                  userId,
                },
              },
            },
          },
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            section: {
              select: {
                id: true,
                title: true,
                course: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
        submissions: {
          where: {
            studentId: userId,
          },
          select: {
            id: true,
            content: true,
            fileId: true,
            grade: true,
            feedback: true,
            submittedAt: true,
            gradedAt: true,
            file: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new ApiResponse(
      true,
      'Assignments retrieved successfully',
      assignments,
    );
  }

  // =========================
  // Create Assignment for a Lesson by a Teacher
  // =========================

  async create(userId: string, dto: CreateAssignmentDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id: dto.lessonId,
      },
      include: {
        assignment: true,
        section: {
          include: {
            course: {
              include: {
                teacher: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.assignment) {
      throw new ConflictException('Assignment already exists for this lesson');
    }

    if (lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    const assignment = await this.prisma.assignment.create({
      data: {
        lessonId: dto.lessonId,
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });

    return new ApiResponse(true, 'Assignment created successfully', assignment);
  }

  // =========================
  // Get Assignment by ID
  // =========================

  async findOne(assignmentId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: {
                  include: {
                    teacher: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return new ApiResponse(
      true,
      'Assignment retrieved successfully',
      assignment,
    );
  }

  // =========================
  // Update Assignment by ID by a Teacher
  // =========================

  async update(userId: string, assignmentId: string, dto: UpdateAssignmentDto) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: {
                  include: {
                    teacher: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    if (assignment.lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    const updatedAssignment = await this.prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });

    return new ApiResponse(
      true,
      'Assignment updated successfully',
      updatedAssignment,
    );
  }

  // =========================
  // Delete Assignment by ID by a Teacher
  // =========================

  async remove(userId: string, assignmentId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: {
                  include: {
                    teacher: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    if (assignment.lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    await this.prisma.assignment.delete({
      where: {
        id: assignmentId,
      },
    });

    return new ApiResponse(true, 'Assignment deleted successfully', null);
  }

  // =========================
  // Submit Assignment by a Student
  // =========================

  async submit(userId: string, assignmentId: string, dto: SubmitAssignmentDto) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      include: {
        lesson: {
          include: {
            section: true,
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: assignment.lesson.section.courseId,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    const existingSubmission =
      await this.prisma.assignmentSubmission.findUnique({
        where: {
          assignmentId_studentId: {
            assignmentId,
            studentId: userId,
          },
        },
      });

    if (existingSubmission) {
      throw new ConflictException('You have already submitted this assignment');
    }

    if (!dto.content && !dto.fileId) {
      throw new ConflictException(
        'Assignment submission must contain content or a file',
      );
    }

    if (dto.fileId) {
      const file = await this.prisma.media.findUnique({
        where: {
          id: dto.fileId,
        },
      });

      if (!file) {
        throw new NotFoundException('File not found');
      }

      if (file.uploaderId !== userId) {
        throw new ForbiddenException('You are not the owner of this file');
      }
    }

    const submission = await this.prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        studentId: userId,
        content: dto.content,
        fileId: dto.fileId,
      },
      include: {
        file: true,
      },
    });

    return new ApiResponse(
      true,
      'Assignment submitted successfully',
      submission,
    );
  }

  // =========================
  // Get My Submission
  // =========================

  async getMySubmission(userId: string, assignmentId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    const submission = await this.prisma.assignmentSubmission.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: userId,
        },
      },
      include: {
        file: true,
      },
    });

    if (!submission) {
      throw new NotFoundException('You have not submitted this assignment');
    }

    return new ApiResponse(
      true,
      'Submission retrieved successfully',
      submission,
    );
  }

  // =========================
  // Get All Submissions by an Assignment ID by a Teacher
  // =========================

  async getSubmissions(userId: string, assignmentId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: {
                  include: {
                    teacher: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    if (assignment.lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    const submissions = await this.prisma.assignmentSubmission.findMany({
      where: {
        assignmentId,
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        file: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return new ApiResponse(
      true,
      'Submissions retrieved successfully',
      submissions,
    );
  }

  // =========================
  // Grade Submission
  // =========================

  async grade(userId: string, submissionId: string, dto: GradeAssignmentDto) {
    const submission = await this.prisma.assignmentSubmission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                section: {
                  include: {
                    course: {
                      include: {
                        teacher: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    if (submission.assignment.lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    const updatedSubmission = await this.prisma.assignmentSubmission.update({
      where: {
        id: submissionId,
      },
      data: {
        grade: dto.grade,
        feedback: dto.feedback,
        gradedAt: new Date(),
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return new ApiResponse(
      true,
      'Assignment graded successfully',
      updatedSubmission,
    );
  }
}
