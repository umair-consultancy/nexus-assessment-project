import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#C8622E',
          dark: '#A84E24',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        instrument: ['Instrument Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;