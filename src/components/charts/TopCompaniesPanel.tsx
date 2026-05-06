import { useAppDispatch, useAppState } from '@/store/context'

interface Props {
  data: { company: string; count: number }[]
}

export function TopCompaniesPanel({ data }: Props) {
  const dispatch = useAppDispatch()
  const { filters } = useAppState()

  if (data.length === 0) return <div className="text-dim text-sm py-4 text-center">No data</div>

  return (
    <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[240px]">
      {data.map(({ company, count }) => {
        const active = filters.company === company
        return (
          <button
            key={company}
            onClick={() => {
              dispatch({ type: 'SET_FILTER', key: 'company', value: active ? '' : company })
            }}
            className={`flex justify-between items-center px-2.5 py-2 rounded-md text-[13px] text-left transition-colors w-full
              ${active ? 'bg-accent/15 text-accent' : 'bg-surface2 hover:bg-accent/10 text-[#e8ecf3]'}`}
          >
            <span className="font-medium truncate pr-3">{company}</span>
            <span className="text-dim font-semibold tabular-nums shrink-0">{count}</span>
          </button>
        )
      })}
    </div>
  )
}
