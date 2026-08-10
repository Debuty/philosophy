import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { isApiError } from "../../../../api/types";
import { signupSchema, defaultFormValues } from "../constants/signupConstants";
import type { SignupFormData, UseSignupReturn } from "../types/signupTypes";
import { useSignupMutation } from "../../hooks/useSignupMutation";

export const useSignup = (): UseSignupReturn => {
  const signupMutation = useSignupMutation();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultFormValues,
  });

  const handleSignup = (data: SignupFormData) => {
    signupMutation.mutate(
      {
        email: data.email,
        password: data.password,
        username: data.username,
        phone: data.phone || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully");
        },
        onError: (error) => {
          console.error("Error signing up:", error);
          toast.error(isApiError(error) ? error.message : "Signup failed");
        },
      },
    );
  };

  return {
    form,
    isLoading: signupMutation.isPending,
    handleSignup,
  };
};
