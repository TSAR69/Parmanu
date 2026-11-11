/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          900: "#0f1115",
          800: "#161a22",
          700: "#1f242e",
          600: "#2a303b",
        },
        ink: "#0a0c11",
        slateLine: "#232a34",
        accent: {
          DEFAULT: "#7c8a99",
          hover: "#9fb0c1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1.25rem", letterSpacing: "0.04em" }],
        body: ["0.875rem", { lineHeight: "1.5rem" }],
        technical: ["0.8125rem", { lineHeight: "1.4rem", letterSpacing: "0.02em" }],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
};
