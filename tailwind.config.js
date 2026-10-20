/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#16181c', soft: '#2a2d33', mute: '#5d626b' },
        sand: { DEFAULT: '#f1ebe1', deep: '#e4dccd', light: '#faf7f2' },
        copper: { DEFAULT: '#b8602f', dark: '#97491f', light: '#d98b5c' },
        moss: '#4f6a58',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      maxWidth: { page: '1200px' },
      letterSpacing: { wider2: '0.18em' },
      screens: { xs: '420px' },
    },
  },
  plugins: [],
};
