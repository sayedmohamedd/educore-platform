import { SignupSchema } from './../schemas/signup.schema';
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

export const useSignup = () => {
  const router = useRouter();

  const { setAccessToken, setUser } = useAuthStore();

  const signup = async (data: SignupSchema) => {
    try {
      const tokens = await authService.signup(data);

      setAccessToken(tokens.access_token);
      // setRefreshToken(tokens.refresh_token);

      const user = await authService.profile(tokens.access_token);

      setUser(user);

      switch (user.role) {
        case "admin":
          router.push("/admin");
          break;

        case "teacher":
          router.push("/teacher");
          break;

        case "student":
          router.push("/student");
          break;

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
    signup,
  };
};
