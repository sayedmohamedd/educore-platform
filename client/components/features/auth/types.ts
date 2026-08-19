export interface LoginDto {
  email: string;
  password: string;
}
export interface SignupDto {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  // refresh_token: string;
}
