export type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y';

export type Holding = {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  cost: number;
  change: number;
  allocation: number;
  sector: string;
  color: string;
};

export type Market = {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  pe: string;
  high52: number;
  low52: number;
  dividend: string;
  sector: string;
  description: string;
  color: string;
  history: Record<Timeframe, number[]>;
  news: { title: string; source: string; time: string; tone: 'positive' | 'neutral' }[];
};

const sleep = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

export const holdings: Holding[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', shares: 36, price: 132.48, value: 4769.28, cost: 3168, change: 50.55, allocation: 19.2, sector: 'Technology', color: '#e6b94c' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', shares: 11, price: 442.57, value: 4868.27, cost: 4048, change: 20.26, allocation: 19.6, sector: 'Technology', color: '#277c83' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', shares: 24, price: 290.65, value: 6975.60, cost: 5928, change: 17.67, allocation: 28.1, sector: 'Broad market', color: '#5e9b77' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', shares: 8, price: 492.12, value: 3936.96, cost: 3680, change: 6.98, allocation: 15.8, sector: 'Financials', color: '#dd8867' },
  { symbol: 'COST', name: 'Costco Wholesale Corporation', shares: 5, price: 1004.61, value: 5023.05, cost: 4400, change: 14.16, allocation: 20.2, sector: 'Consumer', color: '#8a78b8' },
];

export const markets: Market[] = [
  {
    symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', price: 132.48, change: 2.11, changePercent: 1.62,
    marketCap: '$3.24T', pe: '52.8x', high52: 153.13, low52: 45.01, dividend: '0.03%',
    sector: 'Semiconductors', color: '#e6b94c',
    description: 'Designs accelerated computing platforms and graphics processors used across data centers, gaming, and professional visualization.',
    history: { '1D': [127, 129, 128, 130, 131, 130, 132, 132.48], '1W': [119, 121, 120, 124, 122, 127, 130, 132.48], '1M': [108, 111, 116, 113, 120, 118, 126, 132.48], '3M': [96, 103, 111, 107, 118, 121, 127, 132.48], '1Y': [48, 54, 66, 80, 93, 105, 119, 132.48] },
    news: [
      { title: 'NVIDIA expands its next wave of data-center partnerships', source: 'Market Ledger', time: '18 min ago', tone: 'positive' },
      { title: 'What the latest chip cycle says about forward demand', source: 'The Briefing', time: '2 hr ago', tone: 'neutral' },
      { title: 'Semiconductor supply remains a key watch point for 2025', source: 'Capital Notes', time: 'Yesterday', tone: 'neutral' },
    ],
  },
  {
    symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', price: 442.57, change: -1.83, changePercent: -0.41,
    marketCap: '$3.29T', pe: '36.1x', high52: 468.35, low52: 344.77, dividend: '0.74%',
    sector: 'Software', color: '#277c83',
    description: 'Builds software, cloud infrastructure, and productivity tools for organizations and consumers around the world.',
    history: { '1D': [446, 444, 445, 443, 446, 441, 443, 442.57], '1W': [436, 439, 444, 440, 447, 445, 443, 442.57], '1M': [409, 415, 422, 431, 438, 445, 449, 442.57], '3M': [388, 398, 412, 423, 429, 443, 457, 442.57], '1Y': [370, 381, 392, 405, 420, 434, 451, 442.57] },
    news: [
      { title: 'Cloud growth keeps Microsoft in the durable compounder lane', source: 'The Briefing', time: '42 min ago', tone: 'positive' },
      { title: 'Enterprise software budgets show selective resilience', source: 'Market Ledger', time: '4 hr ago', tone: 'neutral' },
    ],
  },
  {
    symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', price: 227.16, change: 0.64, changePercent: 0.28,
    marketCap: '$3.42T', pe: '37.4x', high52: 237.49, low52: 164.08, dividend: '0.43%',
    sector: 'Technology', color: '#8a78b8',
    description: 'Designs consumer hardware, software, and services with a tightly integrated ecosystem.',
    history: { '1D': [225, 226, 224, 227, 226, 228, 227, 227.16], '1W': [220, 222, 225, 224, 228, 230, 227, 227.16], '1M': [211, 214, 216, 220, 224, 221, 229, 227.16], '3M': [200, 207, 213, 217, 221, 225, 232, 227.16], '1Y': [182, 190, 198, 205, 213, 221, 230, 227.16] },
    news: [
      { title: 'Services mix continues to reshape the Apple earnings story', source: 'Capital Notes', time: '1 hr ago', tone: 'positive' },
      { title: 'Investors weigh the next device upgrade cycle', source: 'The Briefing', time: 'Yesterday', tone: 'neutral' },
    ],
  },
  {
    symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', exchange: 'NYSE', price: 492.12, change: 1.06, changePercent: 0.22,
    marketCap: '$1.06T', pe: '16.7x', high52: 498.47, low52: 342.35, dividend: '—',
    sector: 'Financials', color: '#dd8867',
    description: 'A diversified holding company with insurance, rail, energy, and operating businesses.',
    history: { '1D': [489, 490, 488, 491, 492, 490, 493, 492.12], '1W': [480, 484, 487, 485, 489, 492, 494, 492.12], '1M': [455, 461, 467, 472, 478, 486, 490, 492.12], '3M': [428, 439, 450, 462, 471, 480, 489, 492.12], '1Y': [355, 380, 405, 421, 438, 456, 477, 492.12] },
    news: [{ title: 'Berkshire balance sheet offers a different kind of optionality', source: 'Market Ledger', time: '3 hr ago', tone: 'neutral' }],
  },
];

export async function getDashboard() {
  await sleep();
  return {
    totalValue: 248620.4,
    dayChange: 1842.72,
    dayPercent: 0.75,
    totalGain: 36742.18,
    totalGainPercent: 17.34,
    cash: 13047.24,
    invested: 235573.16,
    history: [184, 191, 188, 203, 211, 219, 226, 232, 229, 238, 242, 248.6],
    holdings,
    markets: [
      { label: 'S&P 500', value: '5,995.54', change: '+0.38%', positive: true },
      { label: 'Nasdaq 100', value: '21,503.17', change: '+0.66%', positive: true },
      { label: '10Y Treasury', value: '4.29%', change: '-0.04%', positive: false },
      { label: 'Gold', value: '$2,651.20', change: '+0.21%', positive: true },
    ],
    activity: [
      { title: 'Portfolio review completed', detail: 'AI analyst · 4 source notes', time: 'Today, 9:42 AM', type: 'analysis' },
      { title: 'Watchlist updated', detail: 'Added AAPL and BRK.B', time: 'Yesterday, 3:18 PM', type: 'watch' },
      { title: 'Monthly statement imported', detail: 'September 2025 · $248,620.40', time: 'Sep 30, 8:06 AM', type: 'statement' },
    ],
  };
}

export async function getPortfolio() {
  await sleep(380);
  return { holdings, totalValue: 248620.4, invested: 235573.16, totalGain: 36742.18, cash: 13047.24, history: [184, 191, 188, 203, 211, 219, 226, 232, 229, 238, 242, 248.6] };
}

export async function getMarkets() {
  await sleep(420);
  return markets;
}

export async function getMarket(symbol: string) {
  await sleep(320);
  return markets.find((market) => market.symbol === symbol) ?? markets[0];
}

export async function submitAssistantPrompt(prompt: string) {
  await sleep(650);
  return {
    prompt,
    answer: `Here is a measured read on “${prompt}”. Your portfolio is tilted toward durable large-cap growth, with technology representing 38.8% of invested value. The useful next step is to compare the question against your time horizon and risk capacity rather than react to a single headline. I found no immediate reason to change course based on the available evidence.`,
    sources: ['FinPilot portfolio snapshot', 'Market Ledger · sector monitor', 'The Briefing · weekly context'],
  };
}
