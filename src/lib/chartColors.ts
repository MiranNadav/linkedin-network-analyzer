import type { Theme } from '@/store/themeContext'

export function getChartColors(theme: Theme) {
  const dark = theme === 'dark'
  return {
    dim:          dark ? '#7a92a8' : '#4a6480',
    grid:         dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
    tooltipBg:    dark ? '#1d2e42' : '#eef3f8',
    tooltipBorder:dark ? '#2a4060' : '#b3cce0',
    tooltipText:  dark ? '#e8ecf3' : '#1a2a40',
    cursor:       dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
  }
}
