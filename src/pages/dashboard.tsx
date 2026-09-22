import { useMemo } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'wouter';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { usePortfolioCalculation } from '@/features/portfolio/hooks/use-portfolio';
import { PORTFOLIO_METADATA } from '@/features/portfolio/utils/portfolio-metadata';

import {
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from '@/components/finpilot-shell';

const money = (value: number, digits = 2) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = usePortfolioCalculation();

  const allocation = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.holdings.map((holding) => ({
      name: holding.symbol,
      value: holding.allocation_percent,
      color: PORTFOLIO_METADATA[holding.symbol]?.color ?? '#277c83',
    }));
  }, [data]);

  if (isLoading) {
    return (
      <>
        <PageHeader
          eyebrow="Personal command center"
          title="Your financial picture"
          description="A clear view of your portfolio and current allocation."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <LoadingBlock className="h-64" />
          <LoadingBlock className="h-64" />
        </div>

        <LoadingBlock className="mt-5 h-72" />
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <PageHeader
          eyebrow="Personal command center"
          title="Your financial picture"
        />

        <ErrorBlock message="Portfolio data is taking longer than expected." />
      </>
    );
  }

  const totalValue = data.total_value;
  const totalInvested = data.total_invested;
  const totalProfitLoss = data.total_profit_loss;
  const totalReturnPercent = data.total_return_percent;

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Personal command center"
        title="Your financial picture"
        description="A clear view of what matters in your portfolio."
        action={
          <Link
            href="/assistant"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-[0_3px_0_hsl(187_43%_18%)] transition hover:-translate-y-0.5"
            data-testid="link-dashboard-analyst"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Review with analyst
          </Link>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-[0_12px_30px_hsl(187_63%_29%_/_0.16)] md:p-7">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[22px] border-accent/15" />
          <div className="absolute -right-2 -top-8 h-28 w-28 rounded-full border border-accent/20" />

          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
              Portfolio value
            </div>

            <div
              className="mt-3 font-mono text-[34px] font-medium tracking-[-0.06em] md:text-[42px]"
              data-testid="text-portfolio-value"
            >
              {money(totalValue)}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  totalProfitLoss >= 0
                    ? 'bg-[#5e9b77]/20 text-[#b9e4bf]'
                    : 'bg-[#bc624d]/20 text-[#f0b0a0]'
                }`}
                data-testid="text-total-change"
              >
                <TrendingUp className="h-3.5 w-3.5" />

                {totalProfitLoss >= 0 ? '+' : ''}
                {money(totalProfitLoss)} total
              </span>

              <span className="font-mono text-[10px] text-primary-foreground/45">
                USD · calculated from portfolio data
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/25">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Total return
            </div>

            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#eff6ee] text-[#4b8b62]">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`mt-7 font-mono text-[29px] font-medium tracking-[-0.05em] ${
              totalReturnPercent >= 0
                ? 'text-[#4b8b62]'
                : 'text-[#bc624d]'
            }`}
            data-testid="text-total-gain-percent"
          >
            {totalReturnPercent >= 0 ? '+' : ''}
            {totalReturnPercent.toFixed(2)}%
          </div>

          <div
            className={`mt-2 text-xs font-semibold ${
              totalProfitLoss >= 0
                ? 'text-[#4b8b62]'
                : 'text-[#bc624d]'
            }`}
          >
            {totalProfitLoss >= 0 ? '+' : ''}
            {money(totalProfitLoss)} profit / loss
          </div>

          <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
            Calculated against the portfolio cost basis.
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/25">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Invested value
            </div>

            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#fff4d6] text-[#a87419]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          <div
            className="mt-7 font-mono text-[29px] font-medium tracking-[-0.05em]"
            data-testid="text-invested-value"
          >
            {money(totalInvested)}
          </div>

          <div className="mt-2 text-xs font-semibold text-muted-foreground">
            Cost basis
          </div>

          <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
            Current portfolio value is {money(totalValue)}.
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold tracking-[-0.02em]">
                Holdings at a glance
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Current positions and portfolio allocation
              </p>
            </div>

            <Link
              href="/portfolio"
              className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-primary hover:underline"
              data-testid="link-view-portfolio"
            >
              View portfolio{' '}
              <ChevronRight className="inline h-3 w-3" />
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[530px] text-left text-xs">
              <thead className="border-b border-border font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="pb-3 font-medium">Holding</th>
                  <th className="pb-3 text-right font-medium">Value</th>
                  <th className="pb-3 text-right font-medium">Return</th>
                  <th className="pb-3 text-right font-medium">Weight</th>
                </tr>
              </thead>

              <tbody>
                {data.holdings.slice(0, 4).map((holding) => {
                  const metadata = PORTFOLIO_METADATA[holding.symbol];

                  return (
                    <tr
                      className="border-b border-border/60 last:border-0"
                      key={holding.symbol}
                      data-testid={`row-holding-${holding.symbol}`}
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="grid h-7 w-7 place-items-center rounded-lg text-[9px] font-bold text-primary-foreground"
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

                            <div className="max-w-[145px] truncate text-[10px] text-muted-foreground">
                              {metadata?.name ?? holding.symbol}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-right font-mono">
                        {money(holding.current_value)}
                      </td>

                      <td
                        className={`text-right font-mono ${
                          holding.return_percent >= 0
                            ? 'text-[#4b8b62]'
                            : 'text-[#bc624d]'
                        }`}
                      >
                        {holding.return_percent >= 0 ? '+' : ''}
                        {holding.return_percent.toFixed(2)}%
                      </td>

                      <td className="text-right font-mono text-muted-foreground">
                        {holding.allocation_percent.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-extrabold tracking-[-0.02em]">
                Allocation
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                By holding · current value
              </p>
            </div>

            <Link
              href="/portfolio"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary"
              data-testid="link-allocation-details"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-[142px] w-[142px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={66}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {allocation.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value: number) => [
                      `${value.toFixed(2)}%`,
                      'Allocation',
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="min-w-0 flex-1 space-y-2.5">
              {allocation.slice(0, 4).map((entry) => (
                <div
                  className="flex items-center justify-between gap-2 text-xs"
                  key={entry.name}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />

                    {entry.name}
                  </span>

                  <span className="font-mono text-muted-foreground">
                    {entry.value.toFixed(2)}%
                  </span>
                </div>
              ))}

              {allocation.length > 4 && (
                <div className="pt-1 text-[10px] text-muted-foreground">
                  + {allocation.length - 4} more holding
                  {allocation.length - 4 > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold tracking-[-0.02em]">
              Portfolio overview
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Current portfolio metrics from FinPilot
            </p>
          </div>

          <Link
            href="/portfolio"
            className="text-xs font-bold text-primary hover:underline"
          >
            Full portfolio{' '}
            <ChevronRight className="inline h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-muted/55 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Invested
            </div>

            <div className="mt-2 font-mono text-lg">
              {money(totalInvested)}
            </div>
          </div>

          <div className="rounded-xl bg-muted/55 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Current value
            </div>

            <div className="mt-2 font-mono text-lg">
              {money(totalValue)}
            </div>
          </div>

          <div className="rounded-xl bg-muted/55 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Profit / loss
            </div>

            <div
              className={`mt-2 font-mono text-lg ${
                totalProfitLoss >= 0
                  ? 'text-[#4b8b62]'
                  : 'text-[#bc624d]'
              }`}
            >
              {totalProfitLoss >= 0 ? '+' : ''}
              {money(totalProfitLoss)}
            </div>
          </div>

          <div className="rounded-xl bg-muted/55 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Positions
            </div>

            <div className="mt-2 font-mono text-lg">
              {data.holdings.length}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}