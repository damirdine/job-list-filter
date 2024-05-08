/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        "neutral-light-bg": "hsl(180, 52%, 96%)",
        "neutral-light-filter": "hsl(180, 31%, 95%)",
        "neutral-dark": "hsl(180, 8%, 52%)",
        "neutral-very-dark": "hsl(180, 14%, 20%)",
      },
      fontFamily: {
        "league-spartan": ["League Spartan", "sans-serif"],
      },
      fontSize: {
        base: "15px",
      },
      fontWeight: {
        medium: 500,
        bold: 700,
      },
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};
