export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...blogKeys.lists(), filters || {}] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slugOrId: string) => [...blogKeys.details(), slugOrId] as const,
};
