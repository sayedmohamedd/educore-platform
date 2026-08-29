import { apiClient } from "@/lib/apiClient";
import { CoursesData, Meta } from "../courses/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const teacherClientService = {
  getMyCourses: (options?: RequestInit) =>
    apiClient<CoursesData>(`/teachers/me/courses`, options),

  getMyStudents: (options?: RequestInit) =>
    apiClient<any>(`/teachers/me/students`, options),
};
