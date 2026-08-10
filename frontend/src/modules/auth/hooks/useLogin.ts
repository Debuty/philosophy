import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../../../api/queryKeys";
import { login } from "../api/authApi";
import type { LoginInput } from "../types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (user) => {
      toast.success("Login successful");
      // Session update → GuestRoute redirects (single navigation owner).
      queryClient.setQueryData(queryKeys.auth.session(), user);
    },
  });
}
