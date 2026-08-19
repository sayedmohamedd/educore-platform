import { create } from "zustand";

enum Role {
  ADMIN = "ADMIN",
  TEACHER = "INSTRUCTOR",
  STUDENT = "STUDENT",
}

interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: Role;
}

interface AuthStore {
  accessToken: string | null;
  // refreshToken: string | null;
  user: User | null;

  setAccessToken: (token: string) => void;
  // setRefreshToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  // refreshToken: null,
  user: null,

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));
