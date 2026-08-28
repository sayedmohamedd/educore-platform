/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/lib/apiClient";

export const authService = {
  login: (options?: RequestInit) =>
    apiClient<{ user: any }>(`/auth/login`, options),

  signup: (options?: RequestInit) =>
    apiClient<{ user: any }>(`/auth/signup`, options),

  refresh: (options?: RequestInit) =>
    apiClient<{ user: any }>(`/auth/refresh`, options),

  logout: (options?: RequestInit) => apiClient<any>(`/auth/logout`, options),
};
