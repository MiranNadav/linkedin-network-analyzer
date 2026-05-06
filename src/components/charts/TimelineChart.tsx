import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useTheme } from '@/store/themeContext'
import { getChartColors } from '@/lib/chartColors'

interface Props {
  data: { month: string; count: number }[]
}

export function TimelineChart({ data }: Props) {
  const { theme } = useTheme()
  const c = getChartColors(theme)
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-dim text-sm">No data</div>
  return (
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a66c2" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#0a66c2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={c.grid} />
        <XAxis dataKey="month" tick={{ fill: c.dim, fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis tick={{ fill: c.dim, fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ background: c.tooltipBg, border: `1px solid ${c.tooltipBorder}`, borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: c.tooltipText }}
          itemStyle={{ color: '#0a66c2' }}
          cursor={{ stroke: c.cursor }}
        />
        <Line
          type="monotone" dataKey="count" stroke="#0a66c2" strokeWidth={2}
          dot={false} activeDot={{ r: 4, fill: '#0a66c2' }}
          fill="url(#tlFill)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
