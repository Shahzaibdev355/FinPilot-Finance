import { useMutation, useQuery } from '@tanstack/react-query';
import { getDashboard, getMarket, getMarkets, getPortfolio, submitAssistantPrompt } from '@/services/finpilot';

export function useDashboard() {
  return useQuery({ queryKey: ['finpilot', 'dashboard'], queryFn: getDashboard });
}

export function usePortfolio() {
  return useQuery({ queryKey: ['finpilot', 'portfolio'], queryFn: getPortfolio });
}

export function useMarkets() {
  return useQuery({ queryKey: ['finpilot', 'markets'], queryFn: getMarkets });
}

export function useMarket(symbol: string) {
  return useQuery({ queryKey: ['finpilot', 'market', symbol], queryFn: () => getMarket(symbol), enabled: Boolean(symbol) });
}

export function useAssistantPrompt() {
  return useMutation({ mutationFn: submitAssistantPrompt });
}