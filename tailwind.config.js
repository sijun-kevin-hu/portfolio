/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0d0d14',
        surface: '#14141f',
        'surface-hover': '#1a1a2e',
        gold: '#B3A369',
        'text-primary': '#e8e6e1',
        'text-secondary': '#9896a1',
        'text-tertiary': '#a0a0b0',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      borderColor: {
        gold: 'rgba(179, 163, 105, 0.12)',
        'gold-hover': 'rgba(179, 163, 105, 0.3)',
      },
    },
  },
  plugins: [],
};
