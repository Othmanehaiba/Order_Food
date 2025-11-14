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
        homePrice: '#F3274C',
      },

      keyframes: {
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(50%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 0.8s ease-in-out',
        'slide-right': 'slide-right 0.8s ease-in-out',
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
}}
