import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectApi, deleteProjectApi, updateProjectApi } from "./api";
import { projectKeys } from "./query-key";
import type { Project, ProjectMutationInput } from "./type";

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; data: Project }, Error, ProjectMutationInput>({
    mutationFn: createProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; data: Project },
    Error,
    { id: string; data: Partial<ProjectMutationInput> }
  >({
    mutationFn: ({ id, data }) => updateProjectApi(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      if (result?.data?.slug) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(result.data.slug) });
      }
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
