export const healthKeys = {
  all: ["health"] as const,
  status: () => [...healthKeys.all, "status"] as const,
  root: () => [...healthKeys.all, "root"] as const,
};
