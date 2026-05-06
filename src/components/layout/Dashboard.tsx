import { useFilteredConnections } from '@/hooks/useFilteredConnections'
import { useStats } from '@/hooks/useStats'
import { useChartData } from '@/hooks/useChartData'
import { StatsGrid } from '@/components/stats/StatsGrid'
import { TimelineChart } from '@/components/charts/TimelineChart'
import { RoleCategoryChart } from '@/components/charts/RoleCategoryChart'
import { SeniorityChart } from '@/components/charts/SeniorityChart'
import { TopCompaniesPanel } from '@/components/charts/TopCompaniesPanel'
import { CompanyBreakdown } from '@/components/companies/CompanyBreakdown'
import { FilterBar } from '@/components/filters/FilterBar'
import { ConnectionsTable } from '@/components/table/ConnectionsTable'
import { useAppState } from '@/store/context'

function ChartCard({ title, children, tall }: { title: string; children: React.ReactNode; tall?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-[14px] p-5">
      <h3 className="text-[13px] font-semibold text-dim uppercase tracking-[0.6px] mb-3">{title}</h3>
      <div className={tall ? 'h-[300px]' : 'h-[240px]'}>{children}</div>
    </div>
  )
}

export function Dashboard() {
  const { connections } = useAppState()
  const filtered = useFilteredConnections()
  const stats = useStats(filtered)
  const { timelineData, roleData, seniorityData, topCompaniesData } = useChartData(filtered)

  return (
    <>
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-7">
        <ChartCard title="Connections Over Time" tall>
          <TimelineChart data={timelineData} />
        </ChartCard>
        <ChartCard title="Role Categories" tall>
          <RoleCategoryChart data={roleData} />
        </ChartCard>
        <ChartCard title="Seniority Distribution">
          <SeniorityChart data={seniorityData} />
        </ChartCard>
        <ChartCard title="Top 10 Companies">
          <TopCompaniesPanel data={topCompaniesData} />
        </ChartCard>
      </div>

      <CompanyBreakdown connections={filtered} />

      <FilterBar />

      <ConnectionsTable rows={filtered} totalAll={connections.length} />
    </>
  )
}
