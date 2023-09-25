/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",

  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#146C94",
        "blue": "#19A7CE",
        "sky-blue": "#AFD3E2",
        "pale-blue": "#9AC5F4",
        "light-blue": "#A7ECEE",
        "grey": "#F0F0F0",
        "ultra-dark-green": "#244E4B",
        "dark-green": "#17594A",
        "green": "#65C18C",
        "light-green": "#CDE990",
        "another-green": "#617A55",
        "pale-green": "#A4D0A4",
        "beige": "#F7E1AE",
        "bright-green": "#A2FF86",
        "white-green": "#EDF1D6"


      },
      screens: {
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
        '@md': { min: '640px', max: '767px' },
        '@lg': { min: '768px', max: '1023px' },
        '@xl': { min: '1024px', max: '1279px' },
        '@2xl': { min: '1280px', max: '1535px' },
        "smlg": { 'max': '1280px' },
        'smmax': { 'max': '639px' },
        "xsmmax": { 'max': "375px" }
      }
    },
  },
  plugins: [],
}

