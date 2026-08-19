import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ApiResponse } from '../helper/APIResponse.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(readonly prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return new ApiResponse(
      true,
      'Categories retrieved successfully',
      categories,
    );
  }

  async findOne(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    return new ApiResponse(true, 'Category retrieved successfully', category);
  }

  async create(dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({ data: dto });
    return new ApiResponse(true, 'Category created successfully', category);
  }

  async update(categoryId: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id: categoryId },
      data: dto,
    });
    return new ApiResponse(true, 'Category updated successfully', category);
  }

  async delete(categoryId: string) {
    await this.prisma.category.delete({
      where: { id: categoryId },
    });
    return new ApiResponse(true, 'Category deleted successfully');
  }
}
