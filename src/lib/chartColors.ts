import type { Theme } from '@/store/themeContext'

export function getChartColors(theme: Theme) {
  const dark = theme === 'dark'
  return {
    dim:          dark ? '#8b94ad' : '#5a6a82',
    grid:         dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
    tooltipBg:    dark ? '#1c2440' : '#e8edf5',
    tooltipBorder:dark ? '#2a3454' : '#c5cfe0',
    tooltipText:  dark ? '#e8ecf3' : '#1a2540',
    cursor:       dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
  }
}
