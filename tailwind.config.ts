import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#EB5733",
          darkGray: "#1C1C1C",
          veryDarkGray: "#171717",
          charcoal: "#17171A",
        },
        neutral: {
          white: "#FFFFFF",
          lightGray: "#F7F7F5",
          gray1: "#9E9E99",
          gray2: "#8C8C91",
          gray3: "#73736E",
          gray4: "#666661",
          lightBorder: "#E5E5E0",
          darkBorder: "#3D3D3D",
          lightBeige: "#FCFAF7",
          beigeBg: "#EDEDE8",
          beigeButton: "#FAF0E8",
          beigeFill: "#F0F0EB",
          secondaryText: "#D1D1D4",
        },
        success: {
          green: "#338C38",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        DEFAULT: "8px",
        lg: "14px",
        xl: "16px",
        pill: "20px",
        "pill-lg": "24px",
      },
      spacing: {
        "margin-sm": "16px",
        "margin-md": "32px",
      },
    },
  },
  plugins: [],
};
export default config;
