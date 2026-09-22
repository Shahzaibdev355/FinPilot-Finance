export type NewsSentimentLabel =
  | 'Bullish'
  | 'Somewhat-Bullish'
  | 'Neutral'
  | 'Somewhat-Bearish'
  | 'Bearish';

export interface NewsArticle {
  title: string;
  url: string;
  summary: string;
  source: string;
  published_at: string;
  sentiment_score: number;
  sentiment_label: NewsSentimentLabel;
}

export interface NewsResponse {
  ticker?: string;
  articles: NewsArticle[];
}