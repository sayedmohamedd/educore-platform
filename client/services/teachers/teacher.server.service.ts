import { apiServer } from "@/lib/apiServer";
import { Course } from "../courses/types";
import { ResponseData } from "../admin/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const teachersService = {
  getTeachers: (params: any = {}, options?: RequestInit) =>
    apiServer<ResponseData<"teachers", Teacher[]>>(
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
    apiServer<ResponseData<"courses", Course[]>>(
      `/teachers/me/courses`,
      options,
    ),

  getMyStudents: (options?: RequestInit) =>
    apiServer<any>(`/teachers/me/students`, options),
};

export type Teacher = {
  id: string;
  userId: string;
  bio: string;
  title: string;
  expertise: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};
