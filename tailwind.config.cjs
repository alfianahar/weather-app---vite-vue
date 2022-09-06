/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'w-primary': '#ebf4f5',
        'w-secondary': '#b5c6e0',
      },
    },
    fontFamily: {
      Roboto: ['Roboto, sans-serif'],
    },
    container: {
      padding: '2rem',
      center: 'true',
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
  },
  plugins: [],
};
