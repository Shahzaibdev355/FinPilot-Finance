import { useQuery } from '@tanstack/react-query';

import { getNews } from '../api/news.api';

export function useNews(ticker?: string, limit = 10) {
  return useQuery({
    queryKey: ['news', ticker ?? 'all', limit],
    queryFn: () => getNews(ticker, limit),
  });
}