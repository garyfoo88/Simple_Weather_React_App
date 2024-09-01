import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "light-image": "url('/bg-light.png')",
        "dark-image": "url('/bg-dark.png')",
      },
      colors: {
        "royal-purple": "#6C40B5",
      },
      screens: {
        sm: "700px",
      },
    },
  },
  plugins: [],
};
export default config;
