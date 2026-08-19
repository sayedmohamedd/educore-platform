import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/jwt-auth.guard/roles.guard.js';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get('/:categoryId')
  getOne(@Param('categoryId') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch('/:categoryId')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateOne(@Param('categoryId') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete('/:categoryId')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteOne(@Param('categoryId') id: string) {
    return this.categoriesService.delete(id);
  }
}
