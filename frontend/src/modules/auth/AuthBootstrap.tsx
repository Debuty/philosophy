import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { hasAccessToken } from "../../lib/auth/tokenStorage";
import { getSession } from "./api/authApi";

type AuthBootstrapProps = {
  children: React.ReactNode;
};

/** Prefetches /auth/session when a token exists so ProtectedRoute can resolve quickly. */
export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!hasAccessToken()) return;

    void queryClient.prefetchQuery({
      queryKey: queryKeys.auth.session(),
      queryFn: getSession,
      staleTime: Infinity,
    });
  }, [queryClient]);

  return <>{children}</>;
}
