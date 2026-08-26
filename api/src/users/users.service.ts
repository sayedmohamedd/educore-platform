import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileDto } from './dtos/update-profile.dto.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return new ApiResponse(true, 'User fetched successfully', user);
  }

  async updateProfile(dto: UpdateProfileDto, id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
    });
    if (!user) throw new NotFoundException('User not found');
    return new ApiResponse(true, 'User updated successfully', user);
  }

  async delete(id: string) {
    if (!id) return new ApiResponse(false, 'User not found');

    await this.prisma.refreshToken.deleteMany({
      where: { userId: id },
    });

    await this.prisma.user.delete({
      where: { id },
    });

    return new ApiResponse(true, 'User deleted successfully');
  }
  async getUserCourses(userId: string) {
    const courses = await this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });
    return new ApiResponse(true, 'Courses fetched successfully', courses);
  }
}
