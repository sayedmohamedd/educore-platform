import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileDto } from './dtos/update-profile.dto.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({});
    return new ApiResponse(true, 'Users fetched successfully', users);
  }

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return new ApiResponse(false, 'User not found');
    return new ApiResponse(true, 'User fetched successfully', user);
  }

  async updateProfile(dto: UpdateProfileDto, id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });
    if (!user) return new ApiResponse(false, 'User not found');
    return new ApiResponse(true, 'User updated successfully', user);
  }

  async delete(id: string) {
    if (!id) {
      return new ApiResponse(false, 'User not found');
    }

    await this.prisma.refreshToken.deleteMany({
      where: { userId: id },
    });

    await this.prisma.user.delete({
      where: { id },
    });

    return new ApiResponse(true, 'User deleted successfully');
  }
}
