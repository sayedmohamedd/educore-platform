import { apiClient } from "@/lib/apiClient";
import { apiServer } from "@/lib/apiServer";

type Category = {
  id: string;
  name: string;
  coursesCount: number;
};

type CreateCategoryDto = {
  name: string;
};

export const categoryService = {
  getCategories: (options?: RequestInit) =>
    apiServer<Category[]>("/categories", options),

  getCategory: (categoryId: string, options?: RequestInit) =>
    apiServer<Category>(`/categories/${categoryId}`, options),

  createCategory: (body: CreateCategoryDto, options?: RequestInit) =>
    apiClient<Category>("/categories", {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
};
