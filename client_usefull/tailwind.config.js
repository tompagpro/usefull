import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Inter first, then the system fonts as a fallback while it loads
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    // All the app colors live here: change a value, the whole app follows.
    // Components only use DaisyUI names (bg-primary, text-base-content…).
    themes: [
      {
        usefull: {
          primary: "#4F46E5",
          "primary-content": "#FFFFFF",
          secondary: "#3730A3",
          "secondary-content": "#FFFFFF",
          accent: "#0EA5E9",
          "accent-content": "#FFFFFF",
          neutral: "#3F3F46",
          "neutral-content": "#FAFAFA",
          "base-100": "#FFFFFF", // cards, sidebar
          "base-200": "#F7F7F8", // page background
          "base-300": "#E4E4E7", // borders
          "base-content": "#18181B", // text
          info: "#2563EB",
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.625rem",
          "--rounded-badge": "0.375rem",
        },
      },
      {
        "usefull-dark": {
          primary: "#818CF8",
          "primary-content": "#1E1B4B",
          secondary: "#A5B4FC",
          "secondary-content": "#1E1B4B",
          accent: "#38BDF8",
          "accent-content": "#082F49",
          neutral: "#D4D4D8",
          "neutral-content": "#18181B",
          "base-100": "#18181B",
          "base-200": "#111113",
          "base-300": "#2E2E33",
          "base-content": "#E4E4E7",
          info: "#60A5FA",
          success: "#4ADE80",
          warning: "#FBBF24",
          error: "#F87171",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.625rem",
          "--rounded-badge": "0.375rem",
        },
      },
    ],
    darkTheme: "usefull-dark",
  },
  plugins: [daisyui],
};
