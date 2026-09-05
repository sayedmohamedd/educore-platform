import { Category } from "../categories/types";

export type CreateCourse = {
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  thumbnailId?: string;
  categoryIds: string[];
};

export type UpdateCourse = {
  title?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  thumbnailId?: string;
  categoryIds?: string[];
};

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  REJECTED = "REJECTED",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  PENDING = "PENDING",
}

export type Course = {
  id: string;
  title: string;
  slug: string;
  duration: number;
  description: string;
  price: string;
  status: CourseStatus;
  teacherId?: string;
  thumbnailId: string;
  createdAt: string;
  updatedAt?: string;
  sections?: Section[];
  teacher?: {
    id: string;
    bio: string;
    title: string;
    expertise: string;
    user: {
      id: string;
      fullName: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: Category[];
  rating?: number;
  totalLessons?: number;
};

export type Enrollment = {
  id: string;
  createdAt: string;
  course: Course;
};

export type Meta = {
  total: number;
  page: number;
  lastPage: number;
};

type Section = {
  id: string;
  title: string;
  slug: string;
  order: number;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  title: string;
  description?: string | null;
  videoId?: string | null;
  videoUrl?: string | null;
  duration: number;
  order: number;
  isFree: boolean;
};
