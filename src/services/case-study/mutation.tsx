import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { caseStudyKeys } from "./query-key";
import {
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  type CaseStudyPayload,
  type CaseStudy,
} from "./api";
import type { ApiResponse } from "../axios-client";

/**
 * Mutation hook to create a new case study
 */
export function useCreateCaseStudyMutation(
  options?: UseMutationOptions<ApiResponse<CaseStudy>, Error, CaseStudyPayload>
): UseMutationResult<ApiResponse<CaseStudy>, Error, CaseStudyPayload> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CaseStudyPayload) => createCaseStudy(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: caseStudyKeys.lists() });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to update an existing case study
 */
export function useUpdateCaseStudyMutation(
  options?: UseMutationOptions<
    ApiResponse<CaseStudy>,
    Error,
    { id: string; payload: Partial<CaseStudyPayload> }
  >
): UseMutationResult<
  ApiResponse<CaseStudy>,
  Error,
  { id: string; payload: Partial<CaseStudyPayload> }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CaseStudyPayload> }) =>
      updateCaseStudy(id, payload),
    onSuccess: (...args) => {
      const [data, variables] = args;
      queryClient.invalidateQueries({ queryKey: caseStudyKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: caseStudyKeys.detail(variables.id),
      });
      if (data?.data?.slug) {
        queryClient.invalidateQueries({
          queryKey: caseStudyKeys.detail(data.data.slug),
        });
      }
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to delete a case study
 */
export function useDeleteCaseStudyMutation(
  options?: UseMutationOptions<ApiResponse<{ id: string }>, Error, string>
): UseMutationResult<ApiResponse<{ id: string }>, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCaseStudy(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: caseStudyKeys.all });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}
