import { apiClient } from '@/api/axios';

import type {
    CompanyResponse,
    MarketHistory,
    MarketQuote,
} from '../types/market.types';

export async function getMarketQuote(
    symbol: string,
): Promise<MarketQuote> {
    const response = await apiClient.get<MarketQuote>('/market/quote', {
        params: {
            symbol: symbol.toUpperCase(),
        },
    });

    return response.data;
}

export async function getMarketHistory(
    symbol: string,
): Promise<MarketHistory> {
    const response = await apiClient.get<MarketHistory>('/market/history', {
        params: {
            symbol: symbol.toUpperCase(),
        },
    });

    return response.data;
}

export async function getCompany(
    symbol: string,
): Promise<CompanyResponse> {
    const response = await apiClient.get<CompanyResponse>('/market/company', {
        params: {
            symbol: symbol.toUpperCase(),
        },
    });

    return response.data;
}