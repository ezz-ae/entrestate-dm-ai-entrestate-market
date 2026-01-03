import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          gray: {
            50: "#f5f5f7",
            100: "#e8e8ed",
            200: "#d2d2d7",
            300: "#86868b",
            400: "#6e6e73",
            500: "#424245",
            600: "#1d1d1f",
          },
          blue: "#0071e3",
          green: "#28cd41",
          red: "#ff3b30",
        }
      },
      borderRadius: {
        "apple-lg": "22px",
        "apple-md": "18px",
        "apple-sm": "12px",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    }
  },
  plugins: []
};

export default config;
