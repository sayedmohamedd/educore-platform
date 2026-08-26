import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../helper/APIResponse.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return new ApiResponse(
      true,
      'Notifications retrieved successfully',
      notifications,
    );
  }

  async findOne(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return new ApiResponse(
      true,
      'Notification retrieved successfully',
      notification,
    );
  }

  async readOne(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    const updatedNotification = await this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    return new ApiResponse(
      true,
      'Notification marked as read',
      updatedNotification,
    );
  }

  async readAll(userId: string) {
    const notifications = await this.prisma.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });

    return new ApiResponse(
      true,
      'Notifications marked as read successfully',
      notifications,
    );
  }

  async deleteOne(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    await this.prisma.notification.delete({
      where: { id: notificationId },
    });

    return new ApiResponse(true, 'Notification deleted successfully');
  }
}
