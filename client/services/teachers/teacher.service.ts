import { apiClient } from "@/lib/apiClient";
import { Course } from "../courses/types";
import { ResponseData } from "../admin/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const teacherClientService = {
  getMyCourses: (options?: RequestInit) =>
    apiClient<ResponseData<"courses", Course[]>>(
      `/teachers/me/courses`,
      options,
    ),

  getMyStudents: (options?: RequestInit) =>
    apiClient<any>(`/teachers/me/students`, options),
};
