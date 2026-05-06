import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'

interface Props {
  data: { role: string; count: number }[]
}

export function RoleCategoryChart({ data }: Props) {
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-dim text-sm">No data</div>
  return (
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 4 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
        <XAxis type="number" tick={{ fill: '#8b94ad', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="role" tick={{ fill: '#8b94ad', fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
        <Tooltip
          contentStyle={{ background: '#1c2440', border: '1px solid #2a3454', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#e8ecf3' }}
          itemStyle={{ color: '#4a8eff' }}
          cursor={{ fill: 'rgba(74,142,255,0.06)' }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => <Cell key={i} fill="#4a8eff" fillOpacity={1 - i * 0.04} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
