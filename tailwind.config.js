/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        darkPrimary: "rgb(18,18,18)",
        firePrimary: "rgb(237,119,25)",
        whitePrimary: "rgb(225,220,224)",
        purplePrimary: "rgb(81,29,129)",
      },
      backgroundColor: {
        darkPrimary: "rgb(18,18,18)",
        firePrimary: "rgb(237,119,25)",
        whitePrimary: "rgb(225,220,224)",
        purplePrimary: "rgb(81,29,129)",
      },
      truncate: {
        lines: {
          2: "2",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
