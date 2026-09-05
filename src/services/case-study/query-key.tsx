export const caseStudyKeys = {
  all: ["case-studies"] as const,
  lists: () => [...caseStudyKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...caseStudyKeys.lists(), filters || {}] as const,
  details: () => [...caseStudyKeys.all, "detail"] as const,
  detail: (slugOrId: string) => [...caseStudyKeys.details(), slugOrId] as const,
};
