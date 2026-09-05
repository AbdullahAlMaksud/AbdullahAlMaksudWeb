export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...projectKeys.lists(), filters || {}] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (slugOrId: string) => [...projectKeys.details(), slugOrId] as const,
};
