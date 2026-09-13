/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom trading metric tones
        profit: "#3b82f6",
        loss: "#ef4444",
        
        // Semantic framework pairs for instant light/dark structural shifting
        panel: {
          light: "#ffffff",
          dark: "#0f172a", // Custom theme slate canvas
        },
        surface: {
          light: "#f9fafb", // Light background gray
          dark: "#1e293b",   // Dark border/card fills
        },
        borderSeparator: {
          light: "#e2e8f0",
          dark: "#334155",
        }
      },
    },
  },
  plugins: [],
};
