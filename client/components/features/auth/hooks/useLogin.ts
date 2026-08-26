import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { LoginSchema } from "../schemas/login.schema";
import axios from "axios";

export const useLogin = () => {
  const router = useRouter();

  const { setUser } = useAuthStore();

  const login = async (data: LoginSchema) => {
    try {
      const { user } = await authService.login({
        method: "POST",
        body: JSON.stringify(data),
      });

      setUser(user);

      switch (user.role) {
        case "admin":
          router.push("/admin");
          break;

        case "teacher":
          router.push("/teacher");
          break;

        // case "student":
        //   router.push("/student");
        //   break;

        default:
          router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ??
            "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        );
      }

      throw new Error("حدث خطأ غير متوقع.");
    }
  };

  return {
    login,
  };
};
