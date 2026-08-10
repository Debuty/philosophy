import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../api/queryKeys";
import { clearAccessToken } from "../../../lib/auth/tokenStorage";
import { ROUTES } from "../../../routes/pathes";
import { logout } from "../api/authApi";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: queryKeys.auth.all });
      navigate(ROUTES.LOGIN);
    },
  });
}
