/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import 'dotenv/config';
import { PrismaClient, Prisma } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding database...');

  // =========================
  // Passwords
  // =========================

  const adminPassword = await bcrypt.hash('test1234', 10);
  const teacherPassword = await bcrypt.hash('test1234', 10);
  const studentPassword = await bcrypt.hash('test1234', 10);

  // =========================
  // Users
  // =========================

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@educore.com',
    },
    update: {},
    create: {
      fullName: 'EduCore Admin',
      email: 'admin@educore.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const teacher1 = await prisma.user.upsert({
    where: {
      email: 'teacher1@educore.com',
    },
    update: {},
    create: {
      fullName: 'Ahmed Hassan',
      email: 'teacher1@educore.com',
      password: teacherPassword,
      role: 'INSTRUCTOR',
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: {
      email: 'teacher2@educore.com',
    },
    update: {},
    create: {
      fullName: 'Mohamed Ali',
      email: 'teacher2@educore.com',
      password: teacherPassword,
      role: 'INSTRUCTOR',
    },
  });

  const student1 = await prisma.user.upsert({
    where: {
      email: 'student1@educore.com',
    },
    update: {},
    create: {
      fullName: 'Omar Mohamed',
      email: 'student1@educore.com',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  const student2 = await prisma.user.upsert({
    where: {
      email: 'student2@educore.com',
    },
    update: {},
    create: {
      fullName: 'Youssef Ahmed',
      email: 'student2@educore.com',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  // =========================
  // Teacher Profiles
  // =========================

  const teacherProfile1 = await prisma.teacherProfile.upsert({
    where: {
      userId: teacher1.id,
    },
    update: {},
    create: {
      userId: teacher1.id,
      bio: 'Full Stack Developer and Backend Engineer.',
      title: 'Senior Backend Instructor',
      expertise: 'NestJS, Node.js, PostgreSQL, Prisma',
      phone: '01000000001',
      status: 'APPROVED',
    },
  });

  const teacherProfile2 = await prisma.teacherProfile.upsert({
    where: {
      userId: teacher2.id,
    },
    update: {},
    create: {
      userId: teacher2.id,
      bio: 'Frontend developer specialized in modern React applications.',
      title: 'Frontend Instructor',
      expertise: 'React, Next.js, TypeScript',
      phone: '01000000002',
      status: 'APPROVED',
    },
  });

  // =========================
  // Categories
  // =========================

  const backendCategory = await prisma.category.upsert({
    where: {
      name: 'Backend Development',
    },
    update: {},
    create: {
      name: 'Backend Development',
      slug: 'backend-development',
      description: 'Backend development and server-side programming.',
    },
  });

  const frontendCategory = await prisma.category.upsert({
    where: {
      name: 'Frontend Development',
    },
    update: {},
    create: {
      name: 'Frontend Development',
      slug: 'frontend-development',
      description: 'Modern frontend web development.',
    },
  });

  const databaseCategory = await prisma.category.upsert({
    where: {
      name: 'Databases',
    },
    update: {},
    create: {
      name: 'Databases',
      slug: 'databases',
      description: 'SQL and NoSQL database development.',
    },
  });

  // =========================
  // Media
  // =========================

  const teacher1Avatar = await prisma.media.create({
    data: {
      url: 'https://placehold.co/400x400',
      publicId: 'seed-teacher-1-avatar',
      type: 'IMAGE',
      resourceType: 'image',
      filename: 'teacher-1-avatar.jpg',
      mimeType: 'image/jpeg',
      uploaderId: teacher1.id,
    },
  });

  const teacher2Avatar = await prisma.media.create({
    data: {
      url: 'https://placehold.co/400x400',
      publicId: 'seed-teacher-2-avatar',
      type: 'IMAGE',
      resourceType: 'image',
      filename: 'teacher-2-avatar.jpg',
      mimeType: 'image/jpeg',
      uploaderId: teacher2.id,
    },
  });

  await prisma.user.update({
    where: {
      id: teacher1.id,
    },
    data: {
      avatarId: teacher1Avatar.id,
    },
  });

  await prisma.user.update({
    where: {
      id: teacher2.id,
    },
    data: {
      avatarId: teacher2Avatar.id,
    },
  });

  // =========================
  // Course 1 - PUBLISHED
  // =========================

  const course1Thumbnail = await prisma.media.create({
    data: {
      url: 'https://placehold.co/1280x720',
      publicId: 'seed-course-1-thumbnail',
      type: 'IMAGE',
      resourceType: 'image',
      filename: 'nestjs-course.jpg',
      mimeType: 'image/jpeg',
      uploaderId: teacher1.id,
    },
  });

  const course1 = await prisma.course.create({
    data: {
      title: 'NestJS Backend Development',
      slug: 'nestjs-backend-development',
      description:
        'Build production-ready REST APIs using NestJS, Prisma and PostgreSQL.',
      price: new Prisma.Decimal(500),
      status: 'PUBLISHED',
      teacherId: teacherProfile1.id,
      thumbnailId: course1Thumbnail.id,

      categories: {
        create: [
          {
            categoryId: backendCategory.id,
          },
          {
            categoryId: databaseCategory.id,
          },
        ],
      },
    },
  });

  // =========================
  // Course 1 Sections
  // =========================

  const course1Section1 = await prisma.section.create({
    data: {
      courseId: course1.id,
      title: 'Introduction to NestJS',
      slug: 'introduction-to-nestjs',
      order: 1,
    },
  });

  const course1Section2 = await prisma.section.create({
    data: {
      courseId: course1.id,
      title: 'Prisma and PostgreSQL',
      slug: 'prisma-and-postgresql',
      order: 2,
    },
  });

  // =========================
  // Lesson Videos
  // =========================

  const lesson1Video = await prisma.media.create({
    data: {
      url: 'https://example.com/videos/nestjs-intro.mp4',
      publicId: 'seed-nestjs-intro',
      type: 'VIDEO',
      resourceType: 'video',
      filename: 'nestjs-intro.mp4',
      mimeType: 'video/mp4',
      uploaderId: teacher1.id,
    },
  });

  const lesson2Video = await prisma.media.create({
    data: {
      url: 'https://example.com/videos/controllers.mp4',
      publicId: 'seed-nestjs-controllers',
      type: 'VIDEO',
      resourceType: 'video',
      filename: 'controllers.mp4',
      mimeType: 'video/mp4',
      uploaderId: teacher1.id,
    },
  });

  const lesson3Video = await prisma.media.create({
    data: {
      url: 'https://example.com/videos/prisma.mp4',
      publicId: 'seed-prisma',
      type: 'VIDEO',
      resourceType: 'video',
      filename: 'prisma.mp4',
      mimeType: 'video/mp4',
      uploaderId: teacher1.id,
    },
  });

  // =========================
  // Lessons
  // =========================

  const lesson1 = await prisma.lesson.create({
    data: {
      sectionId: course1Section1.id,
      videoId: lesson1Video.id,
      title: 'What is NestJS?',
      slug: 'what-is-nestjs',
      description: 'Introduction to NestJS architecture.',
      duration: 20,
      order: 1,
      isFree: true,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      sectionId: course1Section1.id,
      videoId: lesson2Video.id,
      title: 'Controllers and Services',
      slug: 'controllers-and-services',
      description: 'Understanding controllers and services.',
      duration: 35,
      order: 2,
      isFree: false,
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      sectionId: course1Section2.id,
      videoId: lesson3Video.id,
      title: 'Prisma with PostgreSQL',
      slug: 'prisma-with-postgresql',
      description: 'Connecting NestJS with Prisma and PostgreSQL.',
      duration: 45,
      order: 1,
      isFree: false,
    },
  });

  // =========================
  // Course 2 - SUBMITTED
  // =========================

  const course2Thumbnail = await prisma.media.create({
    data: {
      url: 'https://placehold.co/1280x720',
      publicId: 'seed-course-2-thumbnail',
      type: 'IMAGE',
      resourceType: 'image',
      filename: 'advanced-node.jpg',
      mimeType: 'image/jpeg',
      uploaderId: teacher1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced Node.js',
      slug: 'advanced-nodejs',
      description: 'Advanced backend concepts with Node.js.',
      price: new Prisma.Decimal(650),
      status: 'SUBMITTED',
      teacherId: teacherProfile1.id,
      thumbnailId: course2Thumbnail.id,

      categories: {
        create: [
          {
            categoryId: backendCategory.id,
          },
        ],
      },
    },
  });

  // =========================
  // Course 3 - DRAFT
  // =========================

  const course3Thumbnail = await prisma.media.create({
    data: {
      url: 'https://placehold.co/1280x720',
      publicId: 'seed-course-3-thumbnail',
      type: 'IMAGE',
      resourceType: 'image',
      filename: 'react-course.jpg',
      mimeType: 'image/jpeg',
      uploaderId: teacher2.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Modern React Development',
      slug: 'modern-react-development',
      description: 'Build modern React applications.',
      price: new Prisma.Decimal(400),
      status: 'DRAFT',
      teacherId: teacherProfile2.id,
      thumbnailId: course3Thumbnail.id,

      categories: {
        create: [
          {
            categoryId: frontendCategory.id,
          },
        ],
      },
    },
  });

  // =========================
  // Enrollment
  // =========================

  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: course1.id,
    },
  });

  // =========================
  // Lesson Progress
  // =========================

  await prisma.lessonProgress.create({
    data: {
      userId: student1.id,
      lessonId: lesson1.id,
      completedAt: new Date(),
    },
  });

  await prisma.lessonProgress.create({
    data: {
      userId: student1.id,
      lessonId: lesson2.id,
      completedAt: new Date(),
    },
  });

  // Student 2 enrolled but has no progress
  await prisma.enrollment.create({
    data: {
      userId: student2.id,
      courseId: course1.id,
    },
  });

  // =========================
  // Done
  // =========================

  console.log('✅ Seed completed successfully');
  console.log('');
  console.log('Accounts:');
  console.log('Admin:      admin@educore.com / test1234');
  console.log('Teacher 1:  teacher1@educore.com / test1234');
  console.log('Teacher 2:  teacher2@educore.com / test1234');
  console.log('Student 1:  student1@educore.com / test1234');
  console.log('Student 2:  student2@educore.com / test1234');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
