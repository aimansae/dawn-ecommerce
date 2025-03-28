import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-stone-300",
    "bg-gray-400",
    "bg-blue-400",
    "bg-red-400",
    "bg-gradient-to-r",
    "from-red-400",
    "via-yellow-400",
    "to-blue-400",
    "bg-gray-100",
    "bg-yellow-200",
    "bg-green-400",
    "bg-gray-900",
    "bg-yellow-800",
    "bg-purple-400",
    "bg-pink-400",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: "var(--customBlack)",
        darkGray: "var(--darkGray)",
        lightGray: "var(--lightGray)",
        whiteTransparent: "var(--whiteTransparent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        headerIcons: "var(--headerIcons)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
