import { apiClient } from '@/api/axios';

import type { NewsResponse } from '../types/news.types';

export async function getNews(
  ticker?: string,
  limit = 10,
): Promise<NewsResponse> {
  const response = await apiClient.get<NewsResponse>('/news', {
    params: {
      ...(ticker ? { ticker: ticker.toUpperCase() } : {}),
      limit,
    },
  });

  return response.data;
}