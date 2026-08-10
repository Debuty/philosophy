import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../shared/loading/Loading";
import { debugLog } from "../utils/debug";
import { hasAccessToken } from "../lib/auth/tokenStorage";
import { useAuthSession } from "../modules/auth/hooks";

interface ProtectedRouteProps {
  redirectPath: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath,
  children,
}) => {
  const hasToken = hasAccessToken();
  const { data: user, isPending, isError } = useAuthSession();

  if (hasToken && isPending) {
    return <Loading message="Checking authentication..." />;
  }

  if (!hasToken || isError || !user) {
    debugLog("Not authenticated, redirecting to:", redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
