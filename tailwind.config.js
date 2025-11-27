/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD60A",
        secondary: "#FFFFFF",
        accent: "#000000",
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['3rem', { lineHeight: '1.2' }],
        h3: ['2.25rem', { lineHeight: '1.2' }],
        h4: ['1.875rem', { lineHeight: '1.3' }],
        h5: ['1.5rem', { lineHeight: '1.4' }],
        h6: ['1.25rem', { lineHeight: '1.4' }],
        body: ['1rem', { lineHeight: '1.6' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        64: '64px',
        96: '96px',
        128: '128px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1200px"
        }
      },
      animation: {
        'gradient-bg': 'gradient-bg 10s ease infinite alternate',
      },
      keyframes: {
        'gradient-bg': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}