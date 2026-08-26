/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiServer } from "@/lib/apiServer";
import { Course, CoursesData } from "./types";

export const courseServerService = {
  getCourses: (params: any = {}, options?: RequestInit) =>
    apiServer<CoursesData>(`/courses?${new URLSearchParams(params)}`, options),

  getCourse: (courseId: string, options?: RequestInit) =>
    apiServer<Course>(`/courses/${courseId}`, options),

  getTeacherCourses: (options?: RequestInit) =>
    apiServer<CoursesData>(`/courses`, options),
};
