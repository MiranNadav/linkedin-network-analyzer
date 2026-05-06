import type { Stats } from '@/hooks/useStats'

interface StatCardProps {
  label: string
  value: string
  meta: string
}

function StatCard({ label, value, meta }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-[14px] px-5 py-[18px] hover:-translate-y-0.5 hover:border-accent transition-all">
      <div className="text-dim text-[11px] uppercase tracking-[0.7px] font-semibold mb-2">{label}</div>
      <div className="text-[26px] font-bold leading-none">{value}</div>
      <div className="text-dim text-[12px] mt-1.5">{meta}</div>
    </div>
  )
}

export function StatsGrid({ stats }: { stats: Stats }) {
  const { total, totalAll, totalCompanies, cLevel, last90, thisYear, topCompany, topCompanyCount } = stats
  const now = new Date()
  const cards = [
    { label: 'Connections',       value: total.toLocaleString(),  meta: total === totalAll ? 'unfiltered' : `of ${totalAll.toLocaleString()} total` },
    { label: 'Companies',         value: totalCompanies.toLocaleString(), meta: 'unique' },
    { label: 'C-Level / Founders',value: cLevel.toLocaleString(), meta: total ? `${Math.round(cLevel / total * 100)}% of view` : '' },
    { label: 'Added Last 90 Days',value: last90.toLocaleString(), meta: 'recent activity' },
    { label: 'Added This Year',   value: thisYear.toLocaleString(), meta: String(now.getFullYear()) },
    { label: 'Top Company',       value: topCompany,              meta: topCompanyCount ? `${topCompanyCount} connections` : '' },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-7">
      {cards.map(c => <StatCard key={c.label} {...c} />)}
    </div>
  )
}
