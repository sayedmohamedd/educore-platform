import { apiServer } from "@/lib/apiServer";
import { CategoriesResponse } from "./types";

export const categoryServerService = {
  getAll: (options?: RequestInit) =>
    apiServer<CategoriesResponse>("/categories", {
      ...options,
      method: "GET",
    }),
};
