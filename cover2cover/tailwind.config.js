/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        1080: "1080px",
      },
    },
    fontFamily: {
      sans: ["Helvetica"],
    },
    colors: {
      sand: "#F2E8D3",
      brown: "#ca8a04",
      lightGreen: "#BDF4AF",
      red: "#ED9898",
      lightBlue: "#DFEDF6",
      white: "#FFFFFF",
      inputTextGray: "#6b7280",
      inputFieldBlue: "#60a5fa",
      searchFieldHue: "#fff7ed",
      btnHoverBlue: "#93C5FD",
      btnBlue: "#BFDBFE",
      loginBorder: "#cbd5e1",
      black: "#000000",
      brown: "#C4A484",
      darkGrey: "#121212",
      yellowStar: "#facc15",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
  darkMode: "class",
};
