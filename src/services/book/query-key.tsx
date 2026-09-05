export const bookKeys = {
  all: ["books"] as const,
  bundle: () => [...bookKeys.all, "bundle"] as const,
  lists: () => [...bookKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...bookKeys.lists(), filters || {}] as const,
  details: () => [...bookKeys.all, "detail"] as const,
  detail: (slugOrId: string) => [...bookKeys.details(), slugOrId] as const,
};
