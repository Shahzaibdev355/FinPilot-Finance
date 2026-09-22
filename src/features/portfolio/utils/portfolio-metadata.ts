export interface PortfolioMetadata {
    name: string;
    sector: string;
    color: string;
  }
  
  export const PORTFOLIO_METADATA: Record<string, PortfolioMetadata> = {
    AAPL: {
      name: 'Apple Inc.',
      sector: 'Technology',
      color: '#8a78b8',
    },
  
    MSFT: {
      name: 'Microsoft Corporation',
      sector: 'Technology',
      color: '#277c83',
    },
  
    NVDA: {
      name: 'NVIDIA Corporation',
      sector: 'Technology',
      color: '#e6b94c',
    },
  
    GOOGL: {
      name: 'Alphabet Inc.',
      sector: 'Technology',
      color: '#5e9b77',
    },
  };