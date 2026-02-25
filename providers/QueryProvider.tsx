'use client';

import { CONFIG } from '@/constants/config';
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {CONFIG.FEATURES.DEVTOOLS && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
