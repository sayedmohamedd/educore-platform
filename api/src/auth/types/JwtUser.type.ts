export interface JWTPayload {
  sub: string;
  role: string;
}

export interface JwtUser {
  sub: string;
  role: string;
}

export interface RequestWithUser extends Request {
  user: JwtUser;
}

export interface ResponseWithUser extends Response {
  user: JwtUser;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string;
}
