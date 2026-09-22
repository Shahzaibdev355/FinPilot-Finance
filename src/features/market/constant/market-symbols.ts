export interface MarketSymbol {
    symbol: string;
    name: string;
    color: string;
}

export const MARKET_SYMBOLS: MarketSymbol[] = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        color: '#8a78b8',
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        color: '#277c83',
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        color: '#e6b94c',
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        color: '#5e9b77',
    },
    {
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway Inc.',
        color: '#dd8867',
    },
];