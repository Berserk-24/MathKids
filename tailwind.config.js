/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        coral:   { DEFAULT: '#FF6B35', light: '#FF8C5A', dark: '#E05A28' },
        teal:    { DEFAULT: '#00C9A7', light: '#33D4B8', dark: '#00A88C' },
        violet:  { DEFAULT: '#7C5CBF', light: '#9B7ED4', dark: '#634AA3' },
        sun:     { DEFAULT: '#FFD93D', light: '#FFE270', dark: '#F0C730' },
        ocean:   { DEFAULT: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
        forest:  { DEFAULT: '#22C55E', light: '#4ADE80', dark: '#16A34A' },
        cream:   { DEFAULT: '#FFFBF0', dark: '#F5EFD8' },
        ink:     { DEFAULT: '#1E1B2E' },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
