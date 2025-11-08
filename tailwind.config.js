/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html", // Scans all HTML files in your project directory and subdirectories
    // Add other paths here if you use JS or other template languages:
    // "./src/**/*.{js,jsx,ts,tsx}",
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

