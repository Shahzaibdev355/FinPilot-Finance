import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function ValueChart({ values, compact = false }: { values: number[]; compact?: boolean }) {
  const data = values.map((value, index) => ({ label: `${index + 1}`, value }));
  return <ResponsiveContainer width="100%" height={compact ? 82 : 210}>
    <AreaChart data={data} margin={{ top: 8, right: 8, left: compact ? 0 : -20, bottom: 0 }}>
      {!compact && <CartesianGrid vertical={false} stroke="hsl(41 19% 87%)" strokeDasharray="3 5" />}
      {!compact && <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'hsl(190 12% 45%)', fontSize: 10 }} />}
      {!compact && <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(190 12% 45%)', fontSize: 10 }} tickFormatter={(value) => `$${value}k`} />}
      <Tooltip contentStyle={{ border: '1px solid hsl(41 19% 87%)', borderRadius: 10, background: '#fff', fontSize: 11 }} formatter={(value: number) => [`$${value.toFixed(1)}k`, 'Value']} labelFormatter={() => ''} />
      <defs><linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#277c83" stopOpacity={0.24} /><stop offset="100%" stopColor="#277c83" stopOpacity={0.02} /></linearGradient></defs>
      <Area type="monotone" dataKey="value" stroke="#277c83" strokeWidth={2.5} fill="url(#tealFill)" />
    </AreaChart>
  </ResponsiveContainer>;
}

export function MarketChart({ values }: { values: number[] }) {
  const data = values.map((value, index) => ({ index, value }));
  return <ResponsiveContainer width="100%" height={250}><LineChart data={data} margin={{ top: 12, right: 4, left: -22, bottom: 0 }}>
    <CartesianGrid vertical={false} stroke="hsl(41 19% 87%)" strokeDasharray="3 5" />
    <XAxis dataKey="index" tickLine={false} axisLine={false} tick={{ fill: 'hsl(190 12% 45%)', fontSize: 10 }} tickFormatter={(value) => value === 0 ? 'Start' : value === values.length - 1 ? 'Now' : ''} />
    <YAxis domain={['dataMin - 3', 'dataMax + 3']} tickLine={false} axisLine={false} tick={{ fill: 'hsl(190 12% 45%)', fontSize: 10 }} />
    <Tooltip contentStyle={{ border: '1px solid hsl(41 19% 87%)', borderRadius: 10, background: '#fff', fontSize: 11 }} formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']} />
    <Line type="monotone" dataKey="value" stroke="#277c83" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#e6b94c', stroke: '#174247', strokeWidth: 2 }} />
  </LineChart></ResponsiveContainer>;
}