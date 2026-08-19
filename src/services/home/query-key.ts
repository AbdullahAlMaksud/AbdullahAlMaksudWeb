export const homeQueryKeys = {
  all: ["home"] as const,
  details: () => [...homeQueryKeys.all, "detail"] as const,
};
