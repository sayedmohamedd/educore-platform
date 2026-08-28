/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiFeatures, ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateCourseDto } from './dtos/update-course.dto.js';
import { CreateCourseDto } from './dtos/create-course.dto.js';
import { InstructorHelperService } from '../common/services/instructor-helper/instructor-helper.service.js';
import slugify from 'slugify';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly instructorHelper: InstructorHelperService,
  ) {}

  async findAll(query: any) {
    const { page, limit, skip } = ApiFeatures.getPagination(query);
    const orderBy = ApiFeatures.getSorting(query);

    const where: any = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.maxPrice) {
      where.price = {
        gte: 0, // من أول 0 (مجاني)
        lte: parseFloat(String(query.maxPrice)), // لحد أقصى السعر المختار
      };
    }
    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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
                  avatar: { select: { url: true } },
                },
              },
            },
          },
          categories: {
            include: { category: true },
          },
          thumbnail: { select: { url: true } },
        },
      }),
      this.prisma.course.count({ where }),
    ]);

    const meta = {
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };

    return new ApiResponse(true, 'Courses retrieved successfully', {
      courses,
      meta,
    });
  }

  async findOne(courseSlug: string) {
    const rawCourse = await this.prisma.course.findUnique({
      where: {
        slug: courseSlug,
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
        thumbnail: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!rawCourse) {
      throw new NotFoundException('Course not found');
    }

    const course = {
      ...rawCourse,
      categories: rawCourse?.categories.map((item) => ({
        id: item.category.id,
        name: item.category.name,
      })),
    };

    return new ApiResponse(true, 'Course retrieved successfully', course);
  }

  // create course by teacher
  async create(userId: string, dto: CreateCourseDto) {
    // check teacher exists and approved or not
    const teacher = await this.instructorHelper.getTeacher(userId);
    // Create Slug
    const slug = slugify(dto.title, { lower: true });
    // Create Course
    const course = await this.prisma.course.create({
      data: {
        slug,
        teacherId: teacher.id,
        title: dto.title,
        description: dto.description,
        price: dto.price,
        thumbnailId: dto.thumbnailId,

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

  // update course by teacher
  async update(userId: string, courseId: string, dto: UpdateCourseDto) {
    if (!userId || !courseId || !dto) {
      throw new BadRequestException('Missing required fields');
    }

    // check course and teacher Authorization
    await this.instructorHelper.getTeacherCourse(userId, courseId);

    // Update Course
    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        thumbnailId: dto.thumbnailId,

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
        thumbnail: { select: { url: true } },
      },
    });

    return new ApiResponse(true, 'Course updated successfully', updatedCourse);
  }

  // delete course by teacher
  async remove(userId: string, courseId: string) {
    // check course and teacher Authorization
    await this.instructorHelper.getTeacherCourse(userId, courseId);

    // Delete Course
    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return new ApiResponse(true, 'Course deleted successfully');
  }

  // submit course by teacher to admin
  async submit(userId: string, courseId: string) {
    // check course and teacher Authorization
    const course = await this.instructorHelper.getTeacherCourse(
      userId,
      courseId,
    );

    if (course.status !== 'DRAFT') {
      throw new ConflictException('Only draft courses can be submitted');
    }

    const updatedCourse = await this.prisma.course.update({
      where: { id: courseId },
      data: { status: 'SUBMITTED' },
    });

    return new ApiResponse(
      true,
      'Course submitted successfully',
      updatedCourse,
    );
  }

  // By Teacher
  async publish(userId: string, courseId: string) {
    // check course and teacher Authorization
    const course = await this.instructorHelper.getTeacherCourse(
      userId,
      courseId,
    );

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

  async removeCategoryFromCourse(
    userId: string,
    courseId: string,
    categoryId: string,
  ) {
    await this.instructorHelper.getTeacherCourse(userId, courseId);

    const courseCategory = await this.prisma.courseCategory.findUnique({
      where: {
        courseId_categoryId: {
          courseId,
          categoryId,
        },
      },
    });

    if (!courseCategory) {
      throw new NotFoundException('Category is not assigned to this course');
    }

    await this.prisma.courseCategory.delete({
      where: {
        courseId_categoryId: {
          courseId,
          categoryId,
        },
      },
    });

    return new ApiResponse(true, 'Category removed from course successfully');
  }
}
