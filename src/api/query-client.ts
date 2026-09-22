import { QueryClient } from '@tanstack/react-query';

const EIGHT_HOURS = 1000 * 60 * 60 * 8;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: EIGHT_HOURS,
      gcTime: EIGHT_HOURS,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 0,
    },
  },
});