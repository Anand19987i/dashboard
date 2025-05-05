/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        dark: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
        },
      },
    },
  },
  plugins: [],
}