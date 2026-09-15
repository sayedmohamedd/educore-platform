import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { authService } from "../services/auth.service";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signout = async () => {
    try {
      setLoading(true);
      await authService.logout({
        method: "POST",
      });
      useAuthStore.getState().logout();
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/");
      setLoading(false);
    }
  };

  return {
    signout,
    loading,
  };
};
