import { CONFIG } from '@/constants/config';
import { QueryClient } from '@tanstack/react-query';

// TanStack Query 클라이언트 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CONFIG.CACHE.QUERY_STALE_TIME,
      gcTime: CONFIG.CACHE.QUERY_GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
