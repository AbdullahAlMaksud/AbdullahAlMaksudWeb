import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHomeApi } from "./api";
import { homeQueryKeys } from "./query-key";
import type { HomeData } from "./type";

export function useUpdateHomeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<HomeData>) => updateHomeApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
    },
  });
}
