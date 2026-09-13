/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/apiClient";
import { Category, CreateCategory } from "./types";
import { ResponseData } from "../helpers";

export const categoryClientService = {
  create: (body: CreateCategory, options?: RequestInit) =>
    apiClient<any>("/admin/categories", {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  update: (categoryId: string, body: CreateCategory, options?: RequestInit) =>
    apiClient<ResponseData<"category", Category>>(
      `/admin/categories/${categoryId}`,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body),
      },
    ),

  delete: (categoryId: string, options?: RequestInit) =>
    apiClient<null>(`/admin/categories/${categoryId}`, {
      ...options,
      method: "DELETE",
    }),
};
