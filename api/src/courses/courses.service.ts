import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateCourseDto } from './dtos/update-course.dto.js';
import { CreateCourseDto } from './dtos/create-course.dto.js';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const courses = await this.prisma.course.findMany({
      where: {
        status: 'PUBLISHED',
        teacher: {
          status: 'APPROVED',
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            bio: true,
            title: true,
            expertise: true,
            user: {
              select: {
                id: true,
                fullName: true,
                avatar: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return new ApiResponse(true, 'Courses retrieved successfully', courses);
  }

  async findOne(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        sections: {
          include: {
            lessons: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return new ApiResponse(true, 'Course retrieved successfully', course);
  }

  async create(userId: string, dto: CreateCourseDto) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    if (teacher.status !== 'APPROVED') {
      throw new ConflictException('Teacher is not approved');
    }

    const course = await this.prisma.course.create({
      data: {
        teacherId: teacher.id,
        title: dto.title,
        description: dto.description,
        price: dto.price,
        thumbnailId: dto.thumbnail,

        categories: dto.categoryIds
          ? {
              create: dto.categoryIds.map((categoryId) => ({
                category: {
                  connect: {
                    id: categoryId,
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return new ApiResponse(true, 'Course created successfully', course);
  }

  async update(userId: string, courseId: string, dto: UpdateCourseDto) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacher.id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        thumbnailId: dto.thumbnail,

        ...(dto.categoryIds && {
          categories: {
            deleteMany: {},
            create: dto.categoryIds.map((categoryId) => ({
              category: {
                connect: {
                  id: categoryId,
                },
              },
            })),
          },
        }),
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return new ApiResponse(true, 'Course updated successfully', updatedCourse);
  }

  async remove(userId: string, courseId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacher.id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return new ApiResponse(true, 'Course deleted successfully');
  }

  // submit course by teacher to admin
  async submit(userId: string, courseId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacher.id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== 'DRAFT') {
      throw new ConflictException('Only draft courses can be submitted');
    }

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        status: 'SUBMITTED',
      },
    });

    return new ApiResponse(
      true,
      'Course submitted successfully',
      updatedCourse,
    );
  }

  async publish(userId: string, courseId: string) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: teacher.id,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== 'APPROVED') {
      throw new ConflictException('Course must be approved before publishing');
    }

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    return new ApiResponse(
      true,
      'Course published successfully',
      updatedCourse,
    );
  }

  // approve course by id from admin
  async approve(id: string) {
    if (!id) throw new NotFoundException('Course not found');
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        status: 'APPROVED',
      },
    });

    return new ApiResponse(true, 'Course approved successfully', course);
  }

  // reject course by id from admin
  async reject(id: string) {
    if (!id) throw new NotFoundException('Course not found');
    const course = await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        status: 'REJECTED',
      },
    });
    return new ApiResponse(true, 'Course approved successfully', course);
  }
}
