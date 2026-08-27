import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { authService } from "../services/auth.service";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const signout = async () => {
    try {
      setLoading(true);
      await authService.logout({
        method: "POST",
      });
      useAuthStore.getState().logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    signout,
    loading,
  };
};
