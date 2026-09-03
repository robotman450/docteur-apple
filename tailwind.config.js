/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#05070C",
          bgAlt: "#0A0F1A",
          panel: "#0D1420",
          panel2: "#0E1626",
          border: "rgba(91,141,255,0.18)",
          borderGold: "rgba(201,162,39,0.35)",
          blue: "#2F6FED",
          blueLight: "#5B8DFF",
          gold: "#C9A227",
          goldLight: "#E8C767",
          white: "#F5F6F8",
          gray: "#8891A0",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
