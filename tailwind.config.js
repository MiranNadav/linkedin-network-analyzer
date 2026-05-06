/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base:    '#0f1923',
        surface: '#162232',
        surface2:'#1d2e42',
        border:  '#2a4060',
        dim:     '#7a92a8',
        accent:  '#0a66c2',
        accent2: '#378fe9',
        text:    '#e8ecf3',
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','"Segoe UI"','system-ui','sans-serif'],
      },
    },
  },
  plugins: [],
}
