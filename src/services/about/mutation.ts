import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAboutApi } from "./api";
import { aboutQueryKeys } from "./query-key";
import type { AboutData } from "./type";

export function useUpdateAboutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<AboutData>) => updateAboutApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutQueryKeys.all });
    },
  });
}
