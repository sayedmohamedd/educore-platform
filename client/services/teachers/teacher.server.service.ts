import { apiServer } from "@/lib/apiServer";
import { Course } from "../courses/types";
import { ResponseData } from "../admin/types";
import { Teacher } from "./types";
import { ResponseDataWithMeta } from "../helpers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const teachersService = {
  getTeachers: (params: any = {}, options?: RequestInit) =>
    apiServer<ResponseDataWithMeta<"teachers", Teacher[]>>(
      `/teachers?${new URLSearchParams(params)}`,
      options,
    ),

  getTeacher: (teacherId: string, options?: RequestInit) =>
    apiServer<any>(`/teachers/${teacherId}`, options),

  getTeacherStudents: (teacherId: string, options?: RequestInit) =>
    apiServer<ResponseData<"teachers", Teacher[]>>(
      `/teachers/${teacherId}/students`,
      options,
    ),

  getMyCourses: (options?: RequestInit) =>
    apiServer<ResponseDataWithMeta<"courses", Course[]>>(
      `/teachers/me/courses`,
      options,
    ),

  getMyStudents: (options?: RequestInit) =>
    apiServer<any>(`/teachers/me/students`, options),

  getMyStatistics: (options?: RequestInit) =>
    apiServer<any>(`/teachers/me/statistics`, options),
};
