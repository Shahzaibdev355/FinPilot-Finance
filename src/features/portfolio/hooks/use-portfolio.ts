import { useQuery } from '@tanstack/react-query';

import {
    calculatePortfolio,
    getPortfolio,
} from '../api/portfolio.api';

export function usePortfolio() {
    return useQuery({
        queryKey: ['portfolio'],
        queryFn: getPortfolio,
    });
}

export function usePortfolioCalculation() {
    return useQuery({
        queryKey: ['portfolio', 'calculation'],
        queryFn: calculatePortfolio,
    });
}