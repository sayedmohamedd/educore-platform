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

  async updateMyProfile(dto: UpdateProfileDto, id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
    });
    if (!user) throw new NotFoundException('User not found');
    return new ApiResponse(true, 'User updated successfully', user);
  }

  async deleteMyProfile(id: string) {
    if (!id) return new ApiResponse(false, 'User not found');

    await this.prisma.refreshToken.deleteMany({
      where: { userId: id },
    });

    await this.prisma.user.delete({
      where: { id },
    });

    return new ApiResponse(true, 'User deleted successfully');
  }
}
