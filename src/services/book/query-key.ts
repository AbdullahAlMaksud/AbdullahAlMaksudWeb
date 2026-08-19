import type { BookQueryParams } from "./type";

export const bookKeys = {
  all: ["books"] as const,
  lists: () => [...bookKeys.all, "list"] as const,
  list: (params?: BookQueryParams) => [...bookKeys.lists(), params] as const,
  details: () => [...bookKeys.all, "detail"] as const,
  detail: (slug: string) => [...bookKeys.details(), slug] as const,
};
