import { apiClient } from "../../../api/client";
import type { ApiSuccess } from "../../../api/types";
import {
  clearAccessToken,
  setAccessToken,
} from "../../../lib/auth/tokenStorage";
import type { AuthResponse, AuthUser, LoginInput, SignupInput } from "../types";

export async function signup(input: SignupInput): Promise<AuthUser> {
  const { data } = await apiClient.post<ApiSuccess<AuthResponse>>("/auth/signup", {
    email: input.email,
    password: input.password,
    username: input.username,
    phone: input.phone || undefined,
  });

  setAccessToken(data.data.accessToken);
  return data.data.user;
}

export async function login(input: LoginInput): Promise<AuthUser> {
  const { data } = await apiClient.post<ApiSuccess<AuthResponse>>("/auth/login", {
    email: input.email,
    password: input.password,
  });

  setAccessToken(data.data.accessToken);
  return data.data.user;
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    clearAccessToken();
  }
}

export async function getSession(): Promise<AuthUser> {
  const { data } = await apiClient.get<ApiSuccess<{ user: AuthUser }>>("/auth/session");
  return data.data.user;
}
