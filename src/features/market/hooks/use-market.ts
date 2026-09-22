import { useQuery } from '@tanstack/react-query';

import {
    getCompany,
    getMarketHistory,
    getMarketQuote,
} from '../api/market.api';

export function useMarketQuote(symbol: string) {
    return useQuery({
        queryKey: ['market', 'quote', symbol],
        queryFn: () => getMarketQuote(symbol),
        enabled: Boolean(symbol),
    });
}

export function useMarketHistory(symbol: string) {
    return useQuery({
        queryKey: ['market', 'history', symbol],
        queryFn: () => getMarketHistory(symbol),
        enabled: Boolean(symbol),
    });
}

export function useCompany(symbol: string) {
    return useQuery({
        queryKey: ['market', 'company', symbol],
        queryFn: () => getCompany(symbol),
        enabled: Boolean(symbol),
    });
}