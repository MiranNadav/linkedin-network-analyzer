# LinkedIn Network Analyzer

Client-side SPA for slicing and dicing a LinkedIn connections export. No backend, no auth, no persistence — all data lives in browser memory for the session.

## Commands

```bash
npm run dev        # dev server (Vite, usually :5173 or :5174)
npm run build      # tsc + vite build → dist/
npm run preview    # serve dist/ locally
npx tsc --noEmit   # type-check only
```

## Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS v3** — dark theme, custom color tokens in `tailwind.config.js`
- **Recharts** — declarative charts (no imperative destroy/init lifecycle)
- **Fuse.js** — fuzzy full-text search across name/company/position/email
- State: `useReducer` + React Context — no external state library

## Architecture

```
src/
├── types/connection.ts        # Connection, FilterState, SortState, AppAction
├── constants/classification.ts # SENIORITY_RULES, ROLE_RULES, SENIORITY_ORDER
├── lib/
│   ├── csvParser.ts           # RFC 4180 parser + LinkedIn preamble detection
│   ├── transform.ts           # classifySeniority(), classifyRole(), transformRows()
│   ├── fuseSearch.ts          # buildFuseIndex(), Fuse config (threshold: 0.35)
│   └── exportCsv.ts           # exportFilteredCSV()
├── store/
│   ├── reducer.ts             # appReducer, initialState
│   └── context.tsx            # AppProvider, useAppState, useAppDispatch
├── hooks/
│   ├── useFilteredConnections.ts  # Fuse search → structural filters → sort
│   ├── useStats.ts                # 6 stat card values from filtered set
│   └── useChartData.ts            # timeline / role / seniority / topCompanies
└── components/
    ├── upload/DropZone.tsx
    ├── layout/AppShell.tsx, Header.tsx, Dashboard.tsx
    ├── stats/StatsGrid.tsx
    ├── charts/TimelineChart.tsx, RoleCategoryChart.tsx, SeniorityChart.tsx, TopCompaniesPanel.tsx
    ├── companies/CompanyBreakdown.tsx
    ├── filters/FilterBar.tsx
    └── table/ConnectionsTable.tsx  (includes Pagination, badges, export button)
```

## Data flow

```
CSV file → csvParser.ts → transformRows() → dispatch(SET_DATA)
                                                   ↓
                                       useFilteredConnections()
                                         1. Fuse.js search (index pre-built on SET_DATA)
                                         2. structural filters (company/role/seniority/year)
                                         3. sort
                                                   ↓
                                    StatsGrid / Charts / CompanyBreakdown / Table
```

## Key invariants

- **Fuse index** built once in `useRef` when `connections` array reference changes, not on every keystroke.
- **Search narrows first**, then structural filters apply on that subset.
- **Charts receive pre-aggregated arrays** from `useChartData` — they are pure presentational components.
- **Company filter is bidirectional**: `TopCompaniesPanel`, `CompanyBreakdown`, and the `FilterBar` dropdown all dispatch `SET_FILTER { key: 'company' }` and stay in sync via context.
- Classification rules live in `src/constants/classification.ts`. `SENIORITY_ORDER` controls display order and must match the string values produced by `classifySeniority()` exactly (including `'IC / Other'` spacing).

## Design tokens (Tailwind)

| Token      | Hex       | Use               |
|------------|-----------|-------------------|
| `base`     | `#0a0e1a` | page background   |
| `surface`  | `#141a2e` | cards             |
| `surface2` | `#1c2440` | inputs, table head|
| `border`   | `#2a3454` | all borders       |
| `dim`      | `#8b94ad` | secondary text    |
| `accent`   | `#4a8eff` | primary highlight |
| `accent2`  | `#7c5cff` | secondary (charts)|
