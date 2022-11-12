/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'md3-surface': '#1C1B1F',
        'md3-secondary-container': '#4A4458',
      },
      backgroundImage: {
        'md3-surface-2':
          'linear-gradient(0deg, rgba(208, 188, 255, 0.08), rgba(208, 188, 255, 0.08)), #1C1B1F',
      },
      textColor: {
        'md3-primary': '#D0BCFF',
        'md3-secondary': '#CCC2DC',
        'md3-on-bg': '#E6E1E5',
        'md3-on-secondary-container': '#E8DEF8',
      },
    },
  },
  plugins: [],
};
