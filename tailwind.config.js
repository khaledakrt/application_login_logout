/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ct-dark-600': '#222',
        'ct-dark-200': '#831843',
        'ct-dark-100': '#f5f6f7',
        'ct-blue-600': '#e9d5ff',
        'ct-yellow-600': '#831843',
      },
      fontFamily: {
        Poppins: ['Poppins, sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1100px',
          xl: '1100px',
          '2xl': '1100px',
        },
      },
    },
  },
  plugins: [],
}
