/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Roboto Condensed"',
          'sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
        lobster: ['"Lobster"', 'cursive'],
      },
    },
  },
  plugins: [require('daisyui')],
}
