import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';

@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get('with-courses')
  getAllWithCourses() {
    return this.categoriesService.findAllWithCourses();
  }

  @Get('with-courses-count')
  getAllWithCoursesCount() {
    return this.categoriesService.findAllWithCoursesCount();
  }

  @Get(':categoryId')
  getOne(@Param('categoryId') id: string) {
    return this.categoriesService.findOne(id);
  }
}
