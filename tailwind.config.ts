import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        neon_blue: "#69C9D0",
        neon_pink: "#EE1D52",
        black: "#000000",
        white: "#FFFFFF",
        second_black: "rgb(29, 33, 41)",
      },
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "20px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
        "title-xl": ["33px", "45px"],
        "title-xl2": ["40px", "45px"],
        "title-medium": ["50px", "45px"],
        "big-title": ["70px", "45px"],
      },
    },
  },
  plugins: [],
};
export default config;
