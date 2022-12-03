/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '400': '400%'
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: "0% 50%" },
          '50%': { backgroundPosition: "100% 50%" }
        },
      },
      animation: {
        gradient: 'gradient 10s ease infinite',
      }
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
