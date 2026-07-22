import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // DHIS2 Asia-Pacific conference blue and supporting shades
        brand: {
          50: '#f2f7fb',
          100: '#e3eef7',
          200: '#c2dcec',
          300: '#9cc4dd',
          400: '#5f97bd',
          500: '#2f6f9c',
          600: '#276696',
          700: '#14547c',
          800: '#0d3a5c',
          900: '#0a2e4a',
          950: '#071f33',
        },
        // Cinnamon / saffron accent — a nod to Sri Lanka
        accent: {
          50: '#fdf6ee',
          100: '#faead6',
          200: '#f4d0a8',
          300: '#f0b98a',
          400: '#f0a35e',
          500: '#e8913f',
          600: '#b0521a',
          700: '#96430f',
          800: '#7a370d',
          900: '#5f2b0b',
        },
        ink: '#122b40',
        body: '#33475a',
        mist: '#f4f8fb',
        line: '#d8e4ee',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '76rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,58,92,.05), 0 8px 24px -12px rgba(13,58,92,.12)',
        lift: '0 2px 4px rgba(13,58,92,.06), 0 20px 40px -16px rgba(13,58,92,.22)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.6s ease-out infinite',
        'fade-up': 'fade-up .7s ease-out both',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
