/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      gridTemplateColumns: {
        sidebar: '250px auto', // 👈 for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: '64px auto', // 👈 for the navbar layout. adds grid-rows-header class
      },
      fontFamily: { sans: ['Inter', ...defaultTheme.fontFamily.sans] },
    },
    colors: {
      primary: {
        light: '#E2F1FF',
        DEFAULT: '#1A6DE3',
        1: '#034CB4',
        dark: '#01214F',
      },
      success: {
        DEFAULT: '#2FA124',
      },
      error: {
        DEFAULT: '#BE0000',
      },
    },
  },
  plugins: [],
});
