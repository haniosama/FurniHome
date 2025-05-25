// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // Update based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
  require('tailwind-scrollbar')({ nocompatible: true }),
],
variants: {
  scrollbar: ['rounded'],
},
}