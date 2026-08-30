// ЗАПОВНЮЄ ШКОЛА — за потреби. Кольори продубльовані з src/index.css,
// бо PDF рендериться поза DOM і не бачить CSS-змінних.
// Джерело істини для екрана — index.css. Тут — дзеркало для PDF.

export const brand = {
  black: '#1c1d1a',
  yellow: '#f2ef9e',
  periwinkle: '#c6cdf2',
  pink: '#f5c9e0',
  greyblue: '#b8c2d2',
  white: '#ffffff',
  grey: '#6b7280',
  line: '#e6e6e2',
  paper: '#faf9f6',
} as const;

export const fonts = {
  head: 'eUkraineHead',
  body: 'eUkraine',
} as const;
