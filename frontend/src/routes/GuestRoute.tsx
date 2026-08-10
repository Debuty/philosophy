import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../shared/loading/Loading";
import { hasAccessToken } from "../lib/auth/tokenStorage";
import { useAuthSession } from "../modules/auth/hooks";
import { ROUTES } from "./pathes";

type GuestRouteProps = {
  children: React.ReactNode;
  /** Where to send an already-authenticated user. Supports `:id` → current user id. */
  redirectPath?: string;
};

function resolveRedirectPath(path: string, userId: string): string {
  return path.includes(":id") ? path.replace(":id", userId) : path;
}

/** Redirects authenticated users away from login/signup. */
const GuestRoute: React.FC<GuestRouteProps> = ({
  children,
  redirectPath = ROUTES.HOME,
}) => {
  const hasToken = hasAccessToken();
  const { data: user, isPending } = useAuthSession();
  console.log("test gust")

  if (hasToken && isPending) {
    return <Loading message="Checking authentication..." />;
  }

  if (user) {
    return (
      <Navigate to={resolveRedirectPath(redirectPath, user.id)} replace />
    );
  }

  return <>{children}</>;
};

export default GuestRoute;
