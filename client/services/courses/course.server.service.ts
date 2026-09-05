/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiServer } from "@/lib/apiServer";
import { Course } from "./types";
import { ResponseData } from "../admin/types";

export const courseServerService = {
  getCourses: (params: any = {}, options?: RequestInit) =>
    apiServer<ResponseData<"courses", Course[]>>(
      `/courses?${new URLSearchParams(params)}`,
      options,
    ),

  getCourse: (courseSlug: string, options?: RequestInit) =>
    apiServer<Course>(`/courses/${courseSlug}`, options),

  getTeacherCourses: (teacherId: string, options?: RequestInit) =>
    apiServer<ResponseData<"courses", Course[]>>(
      `/teachers/${teacherId}/courses`,
      options,
    ),

  // Lessons
  getLessonById: (lessonId: string, options?: RequestInit) =>
    apiServer<any>(`/lessons/${lessonId}`, options),
};
