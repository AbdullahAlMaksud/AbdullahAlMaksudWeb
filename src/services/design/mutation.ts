import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDesignApi, deleteDesignApi, updateDesignApi } from "./api";
import { designQueryKeys } from "./query-key";
import type { DesignMutationInput } from "./type";

export function useCreateDesignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DesignMutationInput) => createDesignApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: designQueryKeys.all });
    },
  });
}

export function useUpdateDesignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DesignMutationInput> }) =>
      updateDesignApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: designQueryKeys.all });
    },
  });
}

export function useDeleteDesignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDesignApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: designQueryKeys.all });
    },
  });
}
