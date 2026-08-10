import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/pathes";
import { useAuthUser } from "../../../../modules/auth/hooks";
import { useLogout } from "../../../../modules/auth/hooks";

/** Header auth adapter — JWT session via React Query (replaces Supabase onAuthStateChange). */
export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onError: (error) => {
        console.error("Error signing out:", error);
      },
    });
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    /** @deprecated use `user` — kept for gradual migration */
    session: user
      ? {
          user: {
            id: user.id,
            email: user.email,
            user_metadata: {
              username: user.username,
              avatar_url: user.avatarUrl,
            },
          },
        }
      : null,
    handleLogout,
    navigateToLogin: () => navigate(ROUTES.LOGIN),
  };
};
