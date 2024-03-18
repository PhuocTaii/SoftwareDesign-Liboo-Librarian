/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    backgroundImage: {
      bgAuth: "url('./assets/auth.png')",
    },
    extend: {
      colors: {
        red: '#EF9595',
        orange: '#EFB495',
        yellow: '#EFD595',
        lightYellow: '#D9D9D9',
        lightOrange: '#FFD8C7',
        textDisable: '#6B7280',
        lightGrey: '#F5F5F5',
        textPrimary: '#263238',
      },
    },
  },
  plugins: [],
})
