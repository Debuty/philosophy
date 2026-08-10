export type AuthUser = {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  role: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  email: string;
  password: string;
  username: string;
  phone?: string;
};
