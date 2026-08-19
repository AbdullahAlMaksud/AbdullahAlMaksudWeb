export const aboutQueryKeys = {
  all: ["about"] as const,
  details: () => [...aboutQueryKeys.all, "detail"] as const,
};
