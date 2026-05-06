/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base:    '#0a0e1a',
        surface: '#141a2e',
        surface2:'#1c2440',
        border:  '#2a3454',
        dim:     '#8b94ad',
        accent:  '#4a8eff',
        accent2: '#7c5cff',
        text:    '#e8ecf3',
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','"Segoe UI"','system-ui','sans-serif'],
      },
    },
  },
  plugins: [],
}
