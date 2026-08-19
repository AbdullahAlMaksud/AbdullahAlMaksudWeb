import type { BlogQueryParams } from "./type";

export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (params?: BlogQueryParams) => [...blogKeys.lists(), params] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
};
