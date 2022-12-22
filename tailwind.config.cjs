/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

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
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#092434',

          secondary: '#D81E5B',

          accent: '#37CDBE',

          neutral: '#030C11',

          'base-100': '#FFFFFF',

          info: '#2B9EB3',

          success: '#44AF69',

          warning: '#FCAB10',

          error: '#D81E5B',
        },
      },
    ],
  },
}
