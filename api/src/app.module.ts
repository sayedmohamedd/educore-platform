import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { WalletModule } from './wallet/wallet.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { SectionsModule } from './sections/sections.module.js';
import { LessonsModule } from './lessons/lessons.module.js';
import { MediaModule } from './media/media.module.js';
import { LearningModule } from './learning/learning.module.js';
import { QuizzesModule } from './quizzes/quizzes.module.js';
import { AssignmentsModule } from './assignments/assignments.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { TransactionsModule } from './transactions/transactions.module.js';
import { WithdrawalsModule } from './withdrawals/withdrawals.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    TeachersModule,
    CategoriesModule,
    EnrollmentsModule,
    NotificationsModule,
    WalletModule,
    PrismaModule,
    SectionsModule,
    LessonsModule,
    MediaModule,
    LearningModule,
    QuizzesModule,
    AssignmentsModule,
    ReviewsModule,
    PaymentsModule,
    TransactionsModule,
    WithdrawalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
