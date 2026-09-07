/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#101014",
        sidebar: "#17171c",
        surface: "#1b1b22",
        "surface-2": "#202029",
        "surface-3": "#2a2a34",
        line: "#2a2a33",
        ink: "#ececf1",
        muted: "#96969f",
        faint: "#6c6c76",
        accent: "#f2b84b",
        good: "#4ade80",
        "good-dim": "#1e3324",
        bad: "#f87171",
        "bad-dim": "#3a2222",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
