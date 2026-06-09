/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Minimalismo premium: tinta quase-preta + um único acento de confiança.
        ink: {
          DEFAULT: '#0B0B0C',
          soft: '#1A1A1D',
          muted: '#5B5B63',
          faint: '#8A8A93',
        },
        // Verde profundo = confiança, fiabilidade (mercado PT).
        accent: {
          50: '#ECFBF4',
          100: '#D1F5E4',
          200: '#A6EBCC',
          300: '#6FDBAE',
          400: '#34C58C',
          500: '#0FA873',
          600: '#0B8A5F',
          700: '#0A6E4D',
          800: '#0B563E',
          900: '#0A4634',
        },
        cream: '#FBFAF7',
        sand: '#F3F1EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,11,12,0.04), 0 8px 30px rgba(11,11,12,0.06)',
        lift: '0 2px 4px rgba(11,11,12,0.05), 0 18px 50px rgba(11,11,12,0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(15,168,115,0.35)' },
          '70%': { boxShadow: '0 0 0 12px rgba(15,168,115,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(15,168,115,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
