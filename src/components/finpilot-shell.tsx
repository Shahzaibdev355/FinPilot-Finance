import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { BarChart3, BriefcaseBusiness, ChevronRight, CircleHelp, Compass, LayoutDashboard, Menu, MessageSquareText, Settings, Sparkles, X } from 'lucide-react';

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/assistant', label: 'AI analyst', icon: MessageSquareText },
  { href: '/markets', label: 'Markets', icon: BarChart3 },
  { href: '/portfolio', label: 'Portfolio', icon: BriefcaseBusiness },
];

export function FinPilotShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-3">
          <Link href="/dashboard" className="flex items-center gap-3" data-testid="link-brand">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_5px_0_hsl(187_43%_10%)]">
              <Compass className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span>
              <span className="block text-[15px] font-extrabold tracking-[-0.03em]">FinPilot</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-sidebar-foreground/55">market intelligence</span>
            </span>
          </Link>
          <button className="rounded-lg p-2 text-sidebar-foreground/65 hover:bg-sidebar-accent lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation" data-testid="button-close-navigation"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-11 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40">Workspace</div>
        <nav className="mt-3 space-y-1" aria-label="Primary navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = location === href || (href === '/dashboard' && location === '/');
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition-all ${active ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/75 hover:text-sidebar-foreground'}`} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>
                <Icon className={`h-[17px] w-[17px] ${active ? 'text-sidebar-primary' : 'text-sidebar-foreground/45 group-hover:text-sidebar-foreground'}`} />
                <span>{label}</span>
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1">
          <Link href="/settings" onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition-all ${location === '/settings' ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`} data-testid="link-nav-settings">
            <Settings className="h-[17px] w-[17px]" /><span>Settings</span>
          </Link>
          <button onClick={() => setLocation('/assistant')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-sidebar-foreground/65 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground" data-testid="button-help">
            <CircleHelp className="h-[17px] w-[17px]" /><span>Help center</span>
          </button>
          <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-3 pt-4">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#e6b94c] font-mono text-xs font-medium text-[#174247]">AM</div>
            <div className="min-w-0"><div className="truncate text-xs font-bold">Shahzaib</div><div className="font-mono text-[10px] text-sidebar-foreground/45">Personal workspace</div></div>
          </div>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-[hsl(187_43%_14%_/_0.45)] lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu overlay" data-testid="button-menu-overlay" />}
      <main className="min-h-[100dvh] lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-border/70 bg-background/90 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation" data-testid="button-open-navigation"><Menu className="h-5 w-5" /></button>
            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#5e9b77]" />Data refreshed 2 min ago</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/assistant" className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold text-primary transition hover:border-primary/40 hover:bg-muted sm:flex" data-testid="link-header-analyst"><Sparkles className="h-3.5 w-3.5 text-[#d3972c]" /> Ask analyst</Link>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground" data-testid="text-header-avatar">AM</div>
          </div>
        </header>
        <div className="mx-auto max-w-[1480px] px-5 py-7 md:px-8 md:py-9">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div><div className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary/65">{eyebrow}</div><h1 className="text-[28px] font-extrabold tracking-[-0.045em] text-foreground md:text-[34px]">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}</div>
    {action}
  </div>;
}

export function LoadingBlock({ className = 'h-40' }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl border border-border bg-card ${className}`} data-testid="status-loading"><div className="space-y-3 p-5"><div className="h-3 w-1/3 rounded bg-muted" /><div className="h-7 w-2/3 rounded bg-muted" /><div className="h-3 w-1/2 rounded bg-muted" /></div></div>;
}

export function ErrorBlock({ message = 'We could not load this view.' }: { message?: string }) {
  return <div className="rounded-2xl border border-[#e7b1a8] bg-[#fff7f3] p-6 text-sm text-[#8f3d32]" data-testid="status-error"><div className="font-bold">Something needs a second look</div><p className="mt-1 opacity-80">{message}</p></div>;
}
