import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryLight: "#b2a5ff",
        primaryDark: "#493d9e",
        secondary: "#dad2ff",
        accent: "#fff2af",
        pinkAccent: "#DD88CF",
      },
      dropShadow: {
        button: "2px 2px 2px rgba(0, 0, 0, 0.50)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
