import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { projectKeys } from "./query-key";
import {
  createProject,
  updateProject,
  deleteProject,
  type ProjectPayload,
  type Project,
} from "./api";
import type { ApiResponse } from "../axios-client";

/**
 * Mutation hook to create a new project
 */
export function useCreateProjectMutation(
  options?: UseMutationOptions<ApiResponse<Project>, Error, ProjectPayload>
): UseMutationResult<ApiResponse<Project>, Error, ProjectPayload> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProjectPayload) => createProject(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to update an existing project
 */
export function useUpdateProjectMutation(
  options?: UseMutationOptions<
    ApiResponse<Project>,
    Error,
    { id: string; payload: Partial<ProjectPayload> }
  >
): UseMutationResult<
  ApiResponse<Project>,
  Error,
  { id: string; payload: Partial<ProjectPayload> }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProjectPayload> }) =>
      updateProject(id, payload),
    onSuccess: (...args) => {
      const [data, variables] = args;
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.id),
      });
      if (data?.data?.slug) {
        queryClient.invalidateQueries({
          queryKey: projectKeys.detail(data.data.slug),
        });
      }
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to delete a project
 */
export function useDeleteProjectMutation(
  options?: UseMutationOptions<ApiResponse<{ id: string }>, Error, string>
): UseMutationResult<ApiResponse<{ id: string }>, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}
