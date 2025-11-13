/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.js", 
    "./**/*.html", 
    "./index.html",
    "./pages/**/*.html",
    "./components/**/*.html",
  ],
  theme: {
    extend: {
            fontFamily: {
            oleo: ['Oleo Script', 'cursive'],
            roboto: ["Roboto", "sans-serif"],
            Fredoka: ["Fredoka", "sans-serif"],
            },
            colors: {
            prixColor: '#007A4B',
            bodyColor: '#FFEEB1',
            headerYellow: "#f3c623",
            headerOrange: "#f39223",
            homePrice : '#F3274C',
            },
      },
    },
  plugins: [],
}
