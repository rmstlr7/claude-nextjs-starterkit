'use client';

import { CONFIG } from '@/constants/config';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: CONFIG.CACHE.QUERY_STALE_TIME,
            gcTime: CONFIG.CACHE.QUERY_GC_TIME,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {CONFIG.FEATURES.DEVTOOLS && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
