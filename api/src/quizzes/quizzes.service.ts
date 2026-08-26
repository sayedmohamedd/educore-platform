import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateQuizDto } from './dtos/create-quiz.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { UpdateQuizDto } from './dtos/update-quiz.dto.js';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateQuizDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id: dto.lessonId,
      },
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
        quiz: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.quiz) {
      throw new ConflictException('Quiz already exists for this lesson');
    }

    if (lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }


    const quiz = await this.prisma.quiz.create({
      data: {
        lessonId: dto.lessonId,
        title: dto.title,
        questions: {
          create: dto.questions.map((question) => ({
            text: question.text,
            order: question.order,
            options: {
              create: question.options,
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return new ApiResponse(true, 'Quiz created successfully', quiz);
  }

  async findOne(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quizId,
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
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const isOwner = quiz.lesson.section.course.teacher.userId === userId;

    // الطالب مش محتاج يشوف الإجابة الصحيحة
    const questions = quiz.questions.map((question) => ({
      ...question,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      options: question.options.map(({ isCorrect, ...option }) => option),
    }));

    return new ApiResponse(true, 'Quiz fetched successfully', {
      id: quiz.id,
      title: quiz.title,
      lessonId: quiz.lessonId,
      questions,
      isOwner,
    });
  }

  async update(userId: string, quizId: string, dto: UpdateQuizDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quizId,
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

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    if (quiz.lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    const updatedQuiz = await this.prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        title: dto.title,
      },
    });

    return new ApiResponse(true, 'Quiz updated successfully', updatedQuiz);
  }

  async remove(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quizId,
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

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    if (quiz.lesson.section.course.teacher.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this course');
    }

    await this.prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });

    return new ApiResponse(true, 'Quiz deleted successfully', null);
  }

  async submit(
    userId: string,
    quizId: string,
    answers: Record<string, string>,
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: true,
              },
            },
          },
        },
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: quiz.lesson.section.course.id,
        },
      },
    });

    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this course');
    }

    let correctAnswers = 0;

    for (const question of quiz.questions) {
      const selectedOptionId = answers[question.id];

      const correctOption = question.options.find((option) => option.isCorrect);

      if (correctOption && selectedOptionId === correctOption.id) {
        correctAnswers++;
      }
    }

    const totalQuestions = quiz.questions.length;

    const score =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return new ApiResponse(true, 'Quiz submitted successfully', {
      quizId: quiz.id,
      totalQuestions,
      correctAnswers,
      score,
    });
  }
}
