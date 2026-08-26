import { apiClient } from "@/lib/apiClient";
import { CoursesData, CreateCourse } from "./types";

export const courseClientService = {
  createCourse: (body: CreateCourse, options?: RequestInit) =>
    apiClient<CoursesData>("/courses", {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
};
