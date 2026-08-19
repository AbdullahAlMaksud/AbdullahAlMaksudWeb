import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInApi, signOutApi, signUpApi } from "./api";
import { authKeys } from "./query-key";
import type { SignInInput, SignUpInput } from "./type";

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; user?: unknown }, Error, SignInInput>({
    mutationFn: signInApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; user?: unknown }, Error, SignUpInput>({
    mutationFn: signUpApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, void>({
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.currentUser(), null);
      queryClient.setQueryData(authKeys.session(), null);
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}
