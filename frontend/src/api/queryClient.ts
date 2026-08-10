import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ApiError, isApiError } from "./types";

function shouldToastError(error: unknown): boolean {
  if (!isApiError(error)) return true;
  // Forms handle these locally
  if (error.statusCode === 400 || error.statusCode === 401 || error.statusCode === 409) {
    return false;
  }
  return true;
}

function getErrorMessage(error: unknown): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (shouldToastError(error)) {
        toast.error(getErrorMessage(error));
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (shouldToastError(error)) {
        toast.error(getErrorMessage(error));
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
          return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
