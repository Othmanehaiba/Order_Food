/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",          // all HTML files in the root
    "./**/*.html",       // all HTML files in subfolders
    // if you later add JS/TS files, you can include:
    // "./**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oleo: ['Oleo Script', 'cursive'],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        prixColor: '#007A4B',
        bodyColor: '#FFEEB1',
        headerYellow: "#f3c623",
        headerOrange: "#f39223",
      },
    },
  },
  plugins: [],
}
