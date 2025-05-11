/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#302F2F', // Main dark gray color
        'primary-light': '#6C6C6C', // Light variant
        'primary-dark': '#1C1C1C', // Dark variant
        warm: {
          DEFAULT: '#302F2F',
          50: '#6C6C6C/10',
          100: '#6C6C6C/20',
          200: '#6C6C6C/40',
          300: '#6C6C6C/60',
          400: '#6C6C6C/70',
          500: '#6C6C6C/80',
          600: '#6C6C6C/90',
          700: '#6C6C6C',
          800: '#1C1C1C',
        },
        background: '#1C1C1C',
        accent: '#868686',
        light: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

