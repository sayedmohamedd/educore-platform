/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/lib/apiClient";
import { apiServer } from "@/lib/apiServer";

export const courseService = {
  getCourses: (params: any = {}, options?: RequestInit) =>
    apiServer<CoursesData>(`/courses?${new URLSearchParams(params)}`, options),

  getCourse: (courseId: string, options?: RequestInit) =>
    apiServer<Course>(`/courses/${courseId}`, options),

  createCourse: (body: CreateCourse, options?: RequestInit) =>
    apiClient<CoursesData>("/courses", {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  getTeacherCourses: (options?: RequestInit) =>
    apiServer<CoursesData>(`/courses`, options),
};

export type CreateCourse = {
  title: string;
  description?: string;
  price: number;
  thumbnail?: string;
  categoryIds?: string[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  price: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  teacherId: string;
  thumbnailId: string;
  createdAt: string;
  updatedAt: string;

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
};

export type Category = {
  id: string;
  name: string;
};

export type Meta = {
  total: number;
  page: number;
  lastPage: number;
};

export type CoursesData = {
  courses: Course[];
  meta?: Meta;
};
