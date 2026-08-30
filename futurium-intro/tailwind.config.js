/** @type {import('tailwindcss').Config} */
// Кольори та шрифти живуть у CSS-змінних (src/index.css) — Tailwind лише
// прокидає їх у утиліти. Нових hex-значень тут бути не повинно.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: 'var(--futurium-black)',
        yellow: 'var(--futurium-yellow)',
        periwinkle: 'var(--futurium-periwinkle)',
        pink: 'var(--futurium-pink)',
        greyblue: 'var(--futurium-greyblue)',
        white: 'var(--futurium-white)',
        grey: 'var(--futurium-grey)',
        line: 'var(--futurium-line)',
        paper: 'var(--futurium-paper)',
      },
      fontFamily: {
        head: 'var(--font-head)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
};
