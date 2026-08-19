"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes fresh data
            gcTime: 1000 * 60 * 30, // 30 minutes cache retention
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              // Don't retry on network failure (status 0), 404, 401, 403
              if (error && "statusCode" in error) {
                const status = (error as { statusCode?: number }).statusCode;
                if (status === 0 || status === 404 || status === 401 || status === 403) {
                  return false;
                }
              }
              return failureCount < 1;
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
