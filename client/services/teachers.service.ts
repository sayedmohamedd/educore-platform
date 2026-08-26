import { apiServer } from "@/lib/apiServer";
import { CoursesData } from "./courses.service";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const teachersService = {
  getTeachers: (params: any = {}, options?: RequestInit) =>
    apiServer<teacherData>(`/teachers?${new URLSearchParams(params)}`, options),

  getTeacher: (teacherId: string, options?: RequestInit) =>
    apiServer<teacherData>(`/teachers/${teacherId}`, options),

  getTeacherStudents: (teacherId: string, options?: RequestInit) =>
    apiServer<teacherData>(`/teachers/${teacherId}/students`, options),

  getTeacherCourses: (options?: RequestInit) =>
    apiServer<CoursesData>(`/teachers/me/courses`, options),
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

export type Meta = {
  total: number;
  page: number;
  lastPage: number;
};

type teacherData = {
  teachers: Teacher[];
  meta?: Meta;
};
