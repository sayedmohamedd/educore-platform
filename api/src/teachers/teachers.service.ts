import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { TeacherApplicationDto } from './dtos/teacher-application.dto.js';
import { ApiResponse } from '../helper/APIResponse.js';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const teachers = await this.prisma.teacherProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return new ApiResponse(true, 'Teachers retrieved successfully', teachers);
  }

  async apply(userId: string, dto: TeacherApplicationDto) {
    const existing = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
    });

    if (existing) {
      throw new ConflictException('Teacher application already exists');
    }

    const profile = await this.prisma.teacherProfile.create({
      data: {
        userId,
        bio: dto.bio,
        title: dto.title,
        expertise: dto.expertise,
        phone: dto.phone,
      },
    });

    return new ApiResponse(
      true,
      'Teacher application submitted successfully',
      profile,
    );
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.teacherProfile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Teacher profile not found');
    }

    return new ApiResponse(
      true,
      'Teacher profile retrieved successfully',
      profile,
    );
  }

  async getPublicProfile(teacherId: string) {
    const profile = await this.prisma.teacherProfile.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    if (!profile || profile.status !== 'APPROVED') {
      throw new NotFoundException('Teacher not found');
    }

    return new ApiResponse(
      true,
      'Teacher profile retrieved successfully',
      profile,
    );
  }

  async approve(teacherId: string) {
    // check if teacher is exists and pending approval or not
    const profile = await this.prisma.teacherProfile.findUnique({
      where: { id: teacherId },
    });

    if (!profile || profile.status !== 'PENDING') {
      throw new NotFoundException('Teacher not found');
    }

    const transaction = await this.prisma.$transaction(async (tx) => {
      const updatedProfile = await tx.teacherProfile.update({
        where: {
          id: teacherId,
          status: 'PENDING',
        },
        data: { status: 'APPROVED' },
      });

      // update user role
      await tx.user.update({
        where: { id: profile.userId },
        data: { role: 'INSTRUCTOR' },
      });

      // create wallet
      await tx.wallet.create({
        data: { teacherProfileId: profile.id },
      });

      return { updatedProfile };
    });

    return new ApiResponse(
      true,
      'Teacher approved successfully',
      transaction.updatedProfile,
    );
  }

  async reject(teacherId: string) {
    const profile = await this.prisma.teacherProfile.update({
      where: {
        id: teacherId,
        status: 'PENDING',
      },
      data: {
        status: 'REJECTED',
      },
    });

    return new ApiResponse(true, 'Teacher rejected successfully', profile);
  }
}
