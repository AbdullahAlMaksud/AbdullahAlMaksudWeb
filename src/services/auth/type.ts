export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user" | string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: string;
  token?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface CurrentUserResponse {
  success: boolean;
  data: {
    user: AuthUser;
    session: AuthSession;
  };
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}
