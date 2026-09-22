export interface PortfolioHolding {
    symbol: string;
    quantity: number;
    average_price: number;
    current_price: number;
  }
  
  export interface PortfolioCalculationHolding extends PortfolioHolding {
    invested_value: number;
    current_value: number;
    profit_loss: number;
    return_percent: number;
    allocation_percent: number;
  }
  
  export interface PortfolioSummary {
    total_invested: number;
    total_value: number;
    total_profit_loss: number;
    total_return_percent: number;
    holdings: PortfolioCalculationHolding[];
  }