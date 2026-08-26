import { create } from "zustand";

export enum Role {
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
  loading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: () =>
    set({
      user: null,
    }),
}));
