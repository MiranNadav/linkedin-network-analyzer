import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#7c5cff', '#4a8eff', '#06b6d4', '#10b981', '#f59e0b', '#94a3b8', '#ef4444', '#ec4899', '#64748b']

interface Props {
  data: { name: string; value: number }[]
}

export function SeniorityChart({ data }: Props) {
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-dim text-sm">No data</div>
  return (
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="45%" cy="50%" innerRadius="50%" outerRadius="80%" paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#1c2440', border: '1px solid #2a3454', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#e8ecf3' }}
          itemStyle={{ color: '#e8ecf3' }}
        />
        <Legend
          layout="vertical" align="right" verticalAlign="middle"
          iconType="circle" iconSize={8}
          formatter={(v) => <span style={{ color: '#8b94ad', fontSize: 11 }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
