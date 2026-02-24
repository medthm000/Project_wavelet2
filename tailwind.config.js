/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#050810',
        'electric-blue': '#00D4FF',
        'neon-green': '#00FF9F',
        gold: '#FFD700',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
