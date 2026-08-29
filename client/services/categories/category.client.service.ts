/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/apiClient";
import { CreateCategory } from "./types";

export const categoryClientService = {
  create: (body: CreateCategory, options?: RequestInit) =>
    apiClient<any>("/admin/categories", {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  update: (categoryId: string, body: CreateCategory, options?: RequestInit) =>
    apiClient<any>(`/admin/categories/${categoryId}`, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (categoryId: string, options?: RequestInit) =>
    apiClient<any>(`/admin/categories/${categoryId}`, {
      ...options,
      method: "DELETE",
    }),
};
