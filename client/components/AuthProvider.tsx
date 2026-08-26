"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { authService } from "./features/auth/services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore((state) => state);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { user } = await authService.refresh({
          method: "POST",
        });
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);

  return children;
}
