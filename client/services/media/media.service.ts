import { apiClient } from "@/lib/apiClient";
import { CreateMedia, Media } from "./types";

export const mediaService = {
  getUploadSignature: async (folder: string) =>
    apiClient<{
      timestamp: number;
      signature: string;
      apiKey: string;
      cloudName: string;
      folder: string;
    }>(`/media/signature?folder=${encodeURIComponent(folder)}`),

  uploadMetadata: async (metadata: CreateMedia, options?: RequestInit) =>
    apiClient<Media>("/media", {
      ...options,
      method: "POST",
      body: JSON.stringify(metadata),
    }),

  getById: async (id: string) => apiClient<Media>(`/media/${id}`),

  delete: async (id: string) => apiClient(`/media/${id}`, { method: "DELETE" }),
};
