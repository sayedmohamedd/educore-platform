import { api } from "@/lib/axios";
import { LoginDto, SignupDto } from "../types";

class AuthService {
  async login(data: LoginDto) {
    const response = await api.post("/auth/login", data);
    return response.data.data; // {user, access_token}
  }

  async signup(data: SignupDto) {
    const response = await api.post("/auth/signup", data);

    return response.data.data;
  }

  async refresh(refreshToken: string) {
    const response = await api.post("/auth/refresh", {
      refreshToken,
    });

    return response.data.data;
  }

  async profile(token: string) {
    const response = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  }
}

export const authService = new AuthService();
