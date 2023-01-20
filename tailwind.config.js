/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
        192: '48rem'
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '1.5xl': '1.2rem',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '6.5xl': '4rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        'helvetica': ['Helvetica', 'sans-serif'],
        'display': ['Helvetica', 'sans-serif'],
        'body': ['Helvetica', 'sans-serif'],
        'sans': ['Helvetica', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
