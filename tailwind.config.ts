import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          500: "#d7fbe8",
          600: "#9df3c4",
          700:"#62d2a2",
          800:"#1fab89"
        }
      }
    },
  },
  plugins: [],
};
export default config;
