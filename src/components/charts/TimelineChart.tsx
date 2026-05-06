import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface Props {
  data: { month: string; count: number }[]
}

export function TimelineChart({ data }: Props) {
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-dim text-sm">No data</div>
  return (
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#7c5cff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{ fill: '#8b94ad', fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis tick={{ fill: '#8b94ad', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{ background: '#1c2440', border: '1px solid #2a3454', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#e8ecf3' }}
          itemStyle={{ color: '#7c5cff' }}
          cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
        />
        <Line
          type="monotone" dataKey="count" stroke="#7c5cff" strokeWidth={2}
          dot={false} activeDot={{ r: 4, fill: '#7c5cff' }}
          fill="url(#tlFill)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
