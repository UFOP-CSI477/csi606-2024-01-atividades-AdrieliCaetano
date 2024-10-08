import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FF4E88", // Cor personalizada primary
        secondary: "#FF8C9E", // Cor personalizada secondary
        terciary: "#FFC6C6",
        accent: "#FFEECC", // Cor personalizada accent

      },
    },
  },
  plugins: [],
};

export default config;