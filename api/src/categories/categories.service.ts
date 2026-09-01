import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ApiResponse } from '../helper/APIResponse.js';

@Injectable()
export class CategoriesService {
  constructor(readonly prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return new ApiResponse(true, 'Categories retrieved successfully', {
      categories,
    });
  }

  async findAllWithCourses() {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        courses: {
          select: {
            course: true,
          },
        },
      },
    });

    const formatedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      courses: category.courses.map((course) => course.course),
    }));

    return new ApiResponse(true, 'Categories retrieved successfully', {
      categories: formatedCategories,
    });
  }

  async findAllWithCoursesCount() {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });

    const formatedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      coursesCount: category._count.courses,
    }));

    return new ApiResponse(true, 'Categories retrieved successfully', {
      categories: formatedCategories,
    });
  }

  async findOne(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, slug: true },
    });
    return new ApiResponse(true, 'Category retrieved successfully', category);
  }
}
