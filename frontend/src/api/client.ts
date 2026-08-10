import axios, { type AxiosError } from "axios";
import {
  clearAccessToken,
  getAccessToken,
} from "../lib/auth/tokenStorage";
import { queryClient } from "./queryClient";
import { queryKeys } from "./queryKeys";
import { ApiError, type ApiErrorCode, type ApiFieldError } from "./types";

const baseURL = import.meta.env.VITE_API_URL as string | undefined;

if (!baseURL) {
  console.warn("VITE_API_URL is not set. API calls will fail until it is configured.");
}

export const apiClient = axios.create({
  baseURL: baseURL ?? "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function mapAxiosError(error: AxiosError): ApiError {
  const status = error.response?.status ?? 500;
  const body = error.response?.data as
    | {
        error?: {
          code?: string;
          message?: string;
          details?: ApiFieldError[];
        };
      }
    | undefined;

  const code = (body?.error?.code as ApiErrorCode | undefined) ?? "UNKNOWN";
  const message = body?.error?.message ?? error.message ?? "Request failed";
  const details = body?.error?.details;

  return new ApiError(status, code, message, details);
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = mapAxiosError(error);

    if (apiError.statusCode === 401) {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
    }

    return Promise.reject(apiError);
  },
);
