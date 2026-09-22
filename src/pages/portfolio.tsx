import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';

import { usePortfolioCalculation } from '@/features/portfolio/hooks/use-portfolio';
import { PORTFOLIO_METADATA } from '@/features/portfolio/utils/portfolio-metadata';
import { showApiError } from '@/lib/api-error';

import {
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from '@/components/finpilot-shell';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

export default function PortfolioPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = usePortfolioCalculation();

  const [filter, setFilter] = useState('All holdings');
  const [sort, setSort] = useState<'value' | 'return'>('value');
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isError && error) {
      showApiError(error);
    }
  }, [isError, error]);

  const sectors = useMemo(() => {
    if (!data) {
      return ['All holdings'];
    }

    return [
      'All holdings',
      ...Array.from(
        new Set(
          data.holdings.map(
            (holding) => PORTFOLIO_METADATA[holding.symbol]?.sector ?? 'Other',
          ),
        ),
      ),
    ];
  }, [data]);

  const visible = useMemo(() => {
    if (!data) {
      return [];
    }

    return [...data.holdings]
      .filter((holding) => {
        const metadata = PORTFOLIO_METADATA[holding.symbol];

        const matchesSector =
          filter === 'All holdings' ||
          (metadata?.sector ?? 'Other') === filter;

        const matchesSearch =
          `${holding.symbol} ${metadata?.name ?? holding.symbol}`
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesSector && matchesSearch;
      })
      .sort((a, b) =>
        sort === 'value'
          ? b.current_value - a.current_value
          : b.return_percent - a.return_percent,
      );
  }, [data, filter, search, sort]);

  if (isLoading) {
    return (
      <>
        <PageHeader
          eyebrow="Portfolio intelligence"
          title="Your portfolio"
        />

        <LoadingBlock className="h-72" />

        <div className="mt-5">
          <LoadingBlock className="h-64" />
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <PageHeader
          eyebrow="Portfolio intelligence"
          title="Your portfolio"
        />

        <ErrorBlock message="Portfolio data is taking longer than expected." />
      </>
    );
  }

  const totalValue = data.total_value;
  const investedValue = data.total_invested;
  const totalProfitLoss = data.total_profit_loss;
  const totalReturnPercent = data.total_return_percent;

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Portfolio intelligence"
        title="Your portfolio"
        description="A considered view of allocation, concentration, and long-term progress."
        action={
          <div className="flex items-center gap-2 rounded-xl border border-[#d9e6df] bg-[#f1f8f2] px-3 py-2 text-xs font-bold text-[#4b8b62]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5e9b77]" />
            Portfolio data
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">
            Total portfolio
          </div>

          <div
            className="mt-4 font-mono text-3xl tracking-[-0.06em]"
            data-testid="text-portfolio-total"
          >
            {money(totalValue)}
          </div>

          <div
            className={`mt-2 text-xs ${
              totalProfitLoss >= 0
                ? 'text-[#b9e4bf]'
                : 'text-[#f0b0a0]'
            }`}
          >
            {totalProfitLoss >= 0 ? '+' : ''}
            {money(totalProfitLoss)} total gain
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Invested value
          </div>

          <div
            className="mt-4 font-mono text-3xl tracking-[-0.06em]"
            data-testid="text-invested-value"
          >
            {money(investedValue)}
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            Cost basis
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Unrealized return
          </div>

          <div
            className={`mt-4 font-mono text-3xl tracking-[-0.06em] ${
              totalReturnPercent >= 0
                ? 'text-[#4b8b62]'
                : 'text-[#bc624d]'
            }`}
            data-testid="text-unrealized-return"
          >
            {totalReturnPercent >= 0 ? '+' : ''}
            {totalReturnPercent.toFixed(2)}%
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            Compared with cost basis
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-extrabold tracking-[-0.02em]">
              Holdings
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {visible.length} positions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a holding"
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-44"
                data-testid="input-portfolio-search"
              />
            </div>

            <button
              onClick={() => setShowFilters((value) => !value)}
              className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-bold transition ${
                showFilters
                  ? 'border-primary bg-[#eff7f5] text-primary'
                  : 'border-input hover:border-primary/40'
              }`}
              data-testid="button-toggle-filters"
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
            </button>

            <button
              onClick={() =>
                setSort((value) =>
                  value === 'value' ? 'return' : 'value',
                )
              }
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-input px-3 text-xs font-bold transition hover:border-primary/40"
              data-testid="button-sort-holdings"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Sort: {sort === 'value' ? 'value' : 'return'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2 rounded-xl bg-muted/60 p-3">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setFilter(sector)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition ${
                  filter === sector
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                }`}
                data-testid={`button-filter-${sector
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
              >
                {sector}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-y border-border font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="py-3 font-medium">Holding</th>
                <th className="py-3 text-right font-medium">Shares</th>
                <th className="py-3 text-right font-medium">Price</th>
                <th className="py-3 text-right font-medium">Value</th>
                <th className="py-3 text-right font-medium">Return</th>
                <th className="py-3 text-right font-medium">Allocation</th>
              </tr>
            </thead>

            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center text-sm text-muted-foreground"
                    data-testid="status-empty-holdings"
                  >
                    No holdings match that filter.
                  </td>
                </tr>
              ) : (
                visible.map((holding) => {
                  const metadata = PORTFOLIO_METADATA[holding.symbol];

                  return (
                    <tr
                      key={holding.symbol}
                      className="border-b border-border/60 transition last:border-0 hover:bg-muted/35"
                      data-testid={`row-portfolio-${holding.symbol}`}
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="grid h-8 w-8 place-items-center rounded-lg text-[9px] font-bold text-primary-foreground"
                            style={{
                              backgroundColor:
                                metadata?.color ?? '#277c83',
                            }}
                          >
                            {holding.symbol.slice(0, 2)}
                          </span>

                          <div>
                            <div className="font-bold">
                              {holding.symbol}
                            </div>

                            <div className="mt-0.5 text-[10px] text-muted-foreground">
                              {metadata?.name ?? holding.symbol}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-right font-mono">
                        {holding.quantity}
                      </td>

                      <td className="text-right font-mono">
                        {money(holding.current_price)}
                      </td>

                      <td className="text-right font-mono font-medium">
                        {money(holding.current_value)}
                      </td>

                      <td
                        className={`text-right font-mono font-medium ${
                          holding.return_percent >= 0
                            ? 'text-[#4b8b62]'
                            : 'text-[#bc624d]'
                        }`}
                      >
                        {holding.return_percent >= 0 ? (
                          <ArrowUpRight className="mr-0.5 inline h-3.5 w-3.5" />
                        ) : (
                          <ArrowDownRight className="mr-0.5 inline h-3.5 w-3.5" />
                        )}

                        {holding.return_percent >= 0 ? '+' : ''}
                        {holding.return_percent.toFixed(2)}%
                      </td>

                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{
                                width: `${Math.min(
                                  holding.allocation_percent,
                                  100,
                                )}%`,
                              }}
                            />
                          </div>

                          <span className="font-mono text-muted-foreground">
                            {holding.allocation_percent.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}