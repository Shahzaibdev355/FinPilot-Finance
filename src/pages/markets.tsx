import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Search,
  Star,
} from 'lucide-react';

import {
  useCompany,
  useMarketHistory,
  useMarketQuote,
} from '@/features/market/hooks/use-market';
import { useNews } from '@/features/news/hooks/use-news';

import { MARKET_SYMBOLS } from '@/features/market/constant/market-symbols';
import { showApiError } from '@/lib/api-error';

import {
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from '@/components/finpilot-shell';
import { MarketChart } from '@/components/data-viz';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

const formatLargeNumber = (value: string) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return value;
  }

  if (number >= 1_000_000_000_000) {
    return `$${(number / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (number >= 1_000_000_000) {
    return `$${(number / 1_000_000_000).toFixed(2)}B`;
  }

  if (number >= 1_000_000) {
    return `$${(number / 1_000_000).toFixed(2)}M`;
  }

  return money(number);
};

const formatPublishedDate = (value: string) => {
  if (!value) {
    return '';
  }

  const date = new Date(
    value.length === 15
      ? `${value.slice(0, 8)}T${value.slice(9)}`
      : value,
  );

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export default function MarketsPage() {
  const [search, setSearch] = useState('');
  const [symbol, setSymbol] = useState('NVDA');
  const [watching, setWatching] = useState(false);

  const selectedMetadata = MARKET_SYMBOLS.find(
    (market) => market.symbol === symbol,
  );

  const {
    data: quote,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
    error: quoteError,
  } = useMarketQuote(symbol);

  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    error: historyError,
  } = useMarketHistory(symbol);

  const {
    data: company,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
  } = useCompany(symbol);

  const {
    data: news,
    isLoading: isNewsLoading,
    isError: isNewsError,
    error: newsError,
  } = useNews(symbol, 10);

  useEffect(() => {
    if (isQuoteError && quoteError) {
      showApiError(quoteError);
    }
  }, [isQuoteError, quoteError]);

  useEffect(() => {
    if (isHistoryError && historyError) {
      showApiError(historyError);
    }
  }, [isHistoryError, historyError]);

  useEffect(() => {
    if (isCompanyError && companyError) {
      showApiError(companyError);
    }
  }, [isCompanyError, companyError]);

  useEffect(() => {
    if (isNewsError && newsError) {
      showApiError(newsError);
    }
  }, [isNewsError, newsError]);

  const filteredMarkets = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MARKET_SYMBOLS;
    }

    return MARKET_SYMBOLS.filter((market) =>
      `${market.symbol} ${market.name}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const chartValues = useMemo(() => {
    if (!history?.data) {
      return [];
    }

    return [...history.data]
      .reverse()
      .map((item) => item.close);
  }, [history]);

  const isLoading =
    isQuoteLoading ||
    isHistoryLoading ||
    isCompanyLoading ||
    isNewsLoading;

  const hasError =
    isQuoteError ||
    isHistoryError ||
    isCompanyError ||
    isNewsError;

  if (isLoading && !quote && !company && !history && !news) {
    return (
      <>
        <PageHeader
          eyebrow="Market intelligence"
          title="Markets"
          description="Search, compare, and understand the companies shaping your portfolio."
        />
        <LoadingBlock className="h-96" />
      </>
    );
  }

  if (!selectedMetadata || !quote || !history || !company) {
    return (
      <>
        <PageHeader
          eyebrow="Market intelligence"
          title="Markets"
          description="Search, compare, and understand the companies shaping your portfolio."
        />
        <ErrorBlock message="Market data is taking longer than expected." />
      </>
    );
  }

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Market intelligence"
        title="Markets"
        description="Search, compare, and understand the companies shaping your portfolio."
        action={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search companies or tickers"
              className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 md:w-64"
              data-testid="input-market-search"
            />
          </div>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              In focus
            </span>

            <span className="font-mono text-[10px] text-muted-foreground">
              {filteredMarkets.length} results
            </span>
          </div>

          <div className="space-y-1">
            {filteredMarkets.length === 0 ? (
              <div
                className="px-2 py-7 text-center text-xs text-muted-foreground"
                data-testid="status-empty-markets"
              >
                No companies found.
              </div>
            ) : (
              filteredMarkets.map((market) => (
                <button
                  key={market.symbol}
                  onClick={() => {
                    setSymbol(market.symbol);
                    setWatching(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${market.symbol === symbol
                      ? 'bg-[#eff7f5] text-primary'
                      : 'hover:bg-muted'
                    }`}
                  data-testid={`button-market-${market.symbol}`}
                >
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg text-[9px] font-bold text-primary-foreground"
                    style={{ backgroundColor: market.color }}
                  >
                    {market.symbol.slice(0, 2)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold">
                      {market.symbol}
                    </span>

                    <span className="block truncate text-[10px] text-muted-foreground">
                      {market.name}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="px-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              Watchlist
            </div>

            <div className="mt-3 rounded-xl border border-dashed border-border p-3 text-[11px] leading-5 text-muted-foreground">
              {watching
                ? `${symbol} is on your watchlist.`
                : 'Keep an eye on a company from its analysis view.'}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <section className="rounded-2xl border border-border bg-card p-5 md:p-7">
            <div className="flex flex-col justify-between gap-5 md:flex-row">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl text-xs font-bold text-primary-foreground"
                  style={{ backgroundColor: selectedMetadata.color }}
                >
                  {symbol.slice(0, 2)}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      className="text-2xl font-extrabold tracking-[-0.05em]"
                      data-testid="text-market-symbol"
                    >
                      {symbol}
                    </h2>

                    <span className="rounded-full bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                      {company.data.Exchange}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {company.data.Name} · {company.data.Sector}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setWatching((value) => !value)}
                className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-bold transition ${watching
                    ? 'border-[#e6b94c] bg-[#fff7dc] text-[#8b671c]'
                    : 'border-input text-muted-foreground hover:border-primary/40 hover:text-primary'
                  }`}
                data-testid="button-watch-market"
              >
                <Star
                  className={`h-3.5 w-3.5 ${watching ? 'fill-current' : ''
                    }`}
                />

                {watching ? 'Watching' : 'Add to watchlist'}
              </button>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div
                  className="font-mono text-4xl tracking-[-0.07em]"
                  data-testid="text-market-price"
                >
                  {money(quote.price)}
                </div>

                <div
                  className={`mt-2 flex items-center gap-1 text-xs font-bold ${quote.change_percent >= 0
                      ? 'text-[#4b8b62]'
                      : 'text-[#bc624d]'
                    }`}
                >
                  {quote.change_percent >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}

                  {quote.change >= 0 ? '+' : ''}
                  {quote.change.toFixed(2)} (
                  {quote.change_percent.toFixed(2)}%) today
                </div>
              </div>
            </div>

            <div className="mt-6">
              <MarketChart values={chartValues} />
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <h2 className="text-base font-extrabold tracking-[-0.02em]">
                Company fundamentals
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                A compact lens, not a recommendation.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  [
                    'Market cap',
                    formatLargeNumber(company.data.MarketCapitalization),
                  ],
                  ['P / E ratio', company.data.PERatio],
                  ['52 week high', money(Number(company.data['52WeekHigh']))],
                  ['52 week low', money(Number(company.data['52WeekLow']))],
                  [
                    'Dividend yield',
                    `${(
                      Number(company.data.DividendYield) * 100
                    ).toFixed(2)}%`,
                  ],
                  ['Exchange', company.data.Exchange],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </div>

                    <div className="mt-1.5 font-mono text-sm font-medium">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
                {company.data.Description}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-extrabold tracking-[-0.02em]">
                    Latest coverage
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Context from selected sources
                  </p>
                </div>

                <span className="rounded-full bg-[#fff7dc] px-2 py-1 font-mono text-[9px] text-[#8b671c]">
                  {news?.articles.length ?? 0} sources
                </span>
              </div>

              <div className="mt-4 divide-y divide-border">
                {isNewsLoading ? (
                  <LoadingBlock className="h-32" />
                ) : news?.articles.length ? (
                  news.articles.map((article) => (
                    <a
                      key={article.title}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block py-3 first:pt-0 last:pb-0"
                      data-testid={`link-news-${article.title.slice(0, 8)}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-xs font-bold leading-5 group-hover:text-primary">
                          {article.title}
                        </div>

                        <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                      </div>

                      <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                        {article.source} ·{' '}
                        {formatPublishedDate(article.published_at)}
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="py-6 text-xs text-muted-foreground">
                    No recent coverage found.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}