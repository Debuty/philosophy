import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { hasAccessToken } from "../../../lib/auth/tokenStorage";
import { getSession } from "../api/authApi";

export function useAuthSession() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: getSession,
    enabled: hasAccessToken(),
    staleTime: Infinity,
    retry: false,
  });
}

export function useAuthUser() {
  const { data, ...rest } = useAuthSession();
  return { user: data ?? null, ...rest };
}

export function useIsAuthenticated() {
  const { data, isLoading, isFetching } = useAuthSession();
  return {
    isAuthenticated: Boolean(data),
    isLoading: hasAccessToken() && (isLoading || isFetching) && !data,
  };
}

export function useIsAdmin() {
  const { user, isLoading } = useAuthUser();
  return {
    isAdmin: user?.role === "admin",
    isLoading,
  };
}
