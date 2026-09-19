import { useEffect, useState, type ReactNode } from 'react';
import { Check, ChevronRight, Info, Moon, Save, Sun } from 'lucide-react';
import { PageHeader } from '@/components/finpilot-shell';
import { toast } from 'sonner';

type SettingsState = { currency: string; timeframe: string; response: string };
const defaults: SettingsState = { currency: 'USD · US Dollar', timeframe: '1 year', response: 'Balanced' };

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem('finpilot-settings') ?? '{}') as Partial<SettingsState> }; } catch { return defaults; }
  });
  const [saved, setSaved] = useState(false);
  useEffect(() => { document.documentElement.classList.remove('dark'); }, []);
  const update = (key: keyof SettingsState, value: string) => { setSaved(false); setSettings((current) => ({ ...current, [key]: value })); };
  const save = () => { localStorage.setItem('finpilot-settings', JSON.stringify(settings)); setSaved(true); };
  return <div className="max-w-[900px] space-y-7">
    <PageHeader eyebrow="Workspace preferences" title="Settings" description="Tune how FinPilot presents information. These choices affect your workspace, not your account." action={<button onClick={save} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-[0_3px_0_hsl(187_43%_18%)] transition hover:-translate-y-0.5" data-testid="button-save-settings"><Save className="h-3.5 w-3.5" />Save changes</button>} />
    {saved && <div className="flex items-center gap-2 rounded-xl border border-[#cde3d1] bg-[#f1f8f2] px-4 py-3 text-xs font-semibold text-[#4b8b62]" data-testid="status-settings-saved"><Check className="h-4 w-4" />Preferences saved to this workspace.</div>}
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card"><div className="border-b border-border px-5 py-4 md:px-6"><h2 className="text-sm font-extrabold">Display & analysis</h2><p className="mt-1 text-xs text-muted-foreground">Small choices that make daily reviews feel like yours.</p></div>
        <div className="divide-y divide-border">
          <SettingRow title="Reporting currency" detail="Used across value, performance, and market views." icon={<span className="font-mono text-sm font-bold">$</span>}><select value={settings.currency} onChange={(event) => update('currency', event.target.value)} className="h-9 w-[170px] rounded-lg border border-input bg-background px-3 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" data-testid="select-currency"><option>USD · US Dollar</option><option>EUR · Euro</option><option>GBP · Pound Sterling</option></select></SettingRow>
          <SettingRow title="Default chart timeframe" detail="The starting range for performance charts." icon={<span className="font-mono text-sm font-bold">↗</span>}><select value={settings.timeframe} onChange={(event) => update('timeframe', event.target.value)} className="h-9 w-[170px] rounded-lg border border-input bg-background px-3 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" data-testid="select-chart-timeframe"><option>1 month</option><option>3 months</option><option>1 year</option><option>5 years</option></select></SettingRow>
          <SettingRow title="AI response preference" detail="How much context the analyst should include." icon={<span className="font-mono text-sm font-bold">Aa</span>}><select value={settings.response} onChange={(event) => update('response', event.target.value)} className="h-9 w-[170px] rounded-lg border border-input bg-background px-3 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" data-testid="select-ai-response"><option>Concise</option><option>Balanced</option><option>Detailed</option></select></SettingRow>
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-card"><div className="border-b border-border px-5 py-4 md:px-6"><h2 className="text-sm font-extrabold">Visual preference</h2><p className="mt-1 text-xs text-muted-foreground">FinPilot is intentionally designed as a light-only workspace for clear reading.</p></div><div className="flex items-center justify-between gap-4 px-5 py-5 md:px-6"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-lg bg-[#fff7dc] text-[#a87419]"><Sun className="h-4 w-4" /></div><div><div className="text-xs font-bold">Light interface</div><div className="mt-1 text-[11px] text-muted-foreground">Always on for reliable contrast and data scanning.</div></div></div><div className="inline-flex items-center gap-2 rounded-full border border-[#e6dcae] bg-[#fff7dc] px-3 py-1.5 text-[10px] font-bold text-[#8b671c]"><span className="h-1.5 w-1.5 rounded-full bg-[#d3972c]" />Active</div></div><div className="flex items-center gap-2 border-t border-border px-5 py-4 text-[10px] text-muted-foreground md:px-6"><Info className="h-3.5 w-3.5" />Dark mode is not available in this workspace.</div></section>
      <section className="rounded-2xl border border-border bg-[#f4faf8] p-5 md:p-6"><div className="flex items-start gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-accent"><Moon className="h-4 w-4" /></div><div><h2 className="text-sm font-extrabold text-primary">A quieter way to use AI</h2><p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">FinPilot is built to help you make sense of information, not to create urgency. The analyst will never place a trade, connect to a broker, or present a prediction as a certainty.</p><button onClick={() => toast.info('FinPilot stays read-only: understand first, act elsewhere.')} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline" data-testid="button-learn-principles">Read our principles <ChevronRight className="h-3.5 w-3.5" /></button></div></div></section>
    </div>
  </div>;
}

function SettingRow({ title, detail, icon, children }: { title: string; detail: string; icon: ReactNode; children: ReactNode }) {
  return <div className="flex flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center md:px-6"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-primary">{icon}</div><div><div className="text-xs font-bold">{title}</div><div className="mt-1 text-[11px] text-muted-foreground">{detail}</div></div></div>{children}</div>;
}