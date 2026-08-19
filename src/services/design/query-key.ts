import type { DesignQueryParams } from "./type";

export const designQueryKeys = {
  all: ["designs"] as const,
  lists: () => [...designQueryKeys.all, "list"] as const,
  list: (params?: DesignQueryParams) => [...designQueryKeys.lists(), params] as const,
  details: () => [...designQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...designQueryKeys.details(), id] as const,
};
