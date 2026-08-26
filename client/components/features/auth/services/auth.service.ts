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

// class AuthService {
//   async login(data: LoginDto) {
//     const response = await api.post("/auth/login", data);
//     return response.data.data; // {user}
//   }

//   async signup(data: SignupDto) {
//     const response = await api.post("/auth/signup", data);
//     return response.data.data;
//   }

//   async refresh() {
//     let response;
//     try {
//       response = await api.post("/auth/refresh");
//       return response.data.data;
//     } catch (error: any) {
//       throw new Error(error?.message || "Failed to refresh token");
//     }
//   }

//   async profile() {
//     const response = await api.get("/auth/profile");
//     return response.data.data;
//   }

//   async logout() {
//     const response = await api.post("/auth/logout");
//     return response.data.data;
//   }
// }

// export const authService = new AuthService();
