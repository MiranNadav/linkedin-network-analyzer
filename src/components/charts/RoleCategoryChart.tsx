import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { useTheme } from '@/store/themeContext'
import { getChartColors } from '@/lib/chartColors'

interface Props {
  data: { role: string; count: number }[]
}

export function RoleCategoryChart({ data }: Props) {
  const { theme } = useTheme()
  const c = getChartColors(theme)
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-dim text-sm">No data</div>
  return (
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 4 }}>
        <CartesianGrid stroke={c.grid} horizontal={false} />
        <XAxis type="number" tick={{ fill: c.dim, fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="role" tick={{ fill: c.dim, fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
        <Tooltip
          contentStyle={{ background: c.tooltipBg, border: `1px solid ${c.tooltipBorder}`, borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: c.tooltipText }}
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
