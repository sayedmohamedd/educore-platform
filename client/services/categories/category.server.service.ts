import { apiServer } from "@/lib/apiServer";
import {
  Category,
  CategoryWithCourses,
  CategoryWithCoursesCount,
} from "./types";
import { ResponseData } from "../helpers";

export const categoryServerService = {
  getAll: (options?: RequestInit) =>
    apiServer<{ categories: Category[] }>("/categories", {
      ...options,
      method: "GET",
    }),

  getAllWithCourses: (options?: RequestInit) =>
    apiServer<ResponseData<"categories", CategoryWithCourses[]>>(
      "/categories/with-courses",
      {
        ...options,
        method: "GET",
      },
    ),

  getAllWithCoursesCount: (options?: RequestInit) =>
    apiServer<ResponseData<"categories", CategoryWithCoursesCount[]>>(
      "/categories/with-courses-count",
      {
        ...options,
        method: "GET",
      },
    ),
};
