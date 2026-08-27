import { apiServer } from "@/lib/apiServer";
import { CoursesData, Meta } from "./courses/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const teachersService = {
  getTeachers: (params: any = {}, options?: RequestInit) =>
    apiServer<teacherData>(`/teachers?${new URLSearchParams(params)}`, options),

  getTeacher: (teacherId: string, options?: RequestInit) =>
    apiServer<any>(`/teachers/${teacherId}`, options),

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

type teacherData = {
  teachers: Teacher[];
  meta?: Meta;
};
