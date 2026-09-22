import { apiClient } from '@/api/axios';

import type {
  PortfolioHolding,
  PortfolioSummary,
} from '../types/portfolio.types';

export async function getPortfolio(): Promise<PortfolioHolding[]> {
  const response = await apiClient.get<PortfolioHolding[]>('/portfolio');

  return response.data;
}

export async function calculatePortfolio(): Promise<PortfolioSummary> {
  const response = await apiClient.post<PortfolioSummary>(
    '/portfolio/calculate',
  );

  return response.data;
}