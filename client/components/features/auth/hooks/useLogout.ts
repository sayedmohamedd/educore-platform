import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export const useLogout = () => {
  const router = useRouter();

  const { logout } = useAuthStore();

  const signout = async () => {
    logout();
    router.push("/");
  };

  return {
    signout,
  };
};
