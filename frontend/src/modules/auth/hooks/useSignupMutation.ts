import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { signup } from "../api/authApi";
import type { SignupInput } from "../types";

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SignupInput) => signup(input),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.session(), user);
    },
  });
}
