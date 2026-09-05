/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/apiClient";
import { Course, CreateCourse, UpdateCourse } from "./types";
import { ResponseData } from "../admin/types";

export const courseClientService = {
  createCourse: (body: CreateCourse, options?: RequestInit) =>
    apiClient<ResponseData<"courses", Course[]>>("/courses", {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateCourse: (courseId: string, body: UpdateCourse, options?: RequestInit) =>
    apiClient<ResponseData<"courses", Course[]>>(`/courses/${courseId}`, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  getCourseBySlug: (courseSlug: string, options?: RequestInit) =>
    apiClient<Course>(`/courses/${courseSlug}`, {
      ...options,
    }),

  // Sections
  addSection: (courseId: string, body: any, options?: RequestInit) =>
    apiClient<any>(`/courses/${courseId}/sections`, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateSection: (sectionId: string, body: any, options?: RequestInit) =>
    apiClient<any>(`/sections/${sectionId}`, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteSection: (sectionId: string, options?: RequestInit) =>
    apiClient<any>(`/sections/${sectionId}`, {
      ...options,
      method: "DELETE",
    }),

  // Lessons
  addLesson: (sectionId: string, body: any, options?: RequestInit) =>
    apiClient<any>(`/sections/${sectionId}/lessons`, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateLesson: (lessonId: string, body: any, options?: RequestInit) =>
    apiClient<any>(`/lessons/${lessonId}`, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteLesson: (lessonId: string, options?: RequestInit) =>
    apiClient<any>(`/lessons/${lessonId}`, {
      ...options,
      method: "DELETE",
    }),
};
