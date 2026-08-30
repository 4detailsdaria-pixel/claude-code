// ЗАПОВНЮЄ ШКОЛА — плейсхолдери замінити на реальні дані.

export const school = {
  name: 'Futurium',
  tagline: 'онлайн-школа англійської',
  /** Посилання на запис. UTM додається автоматично для PDF. */
  bookingUrl: 'https://cal.com/futurium/intro',
  telegram: '@futurium_school',
  instagram: '@futurium.school',
  email: 'hello@futurium.school',
  site: 'futurium.school',
  /** Підпис у стилі бренду на останній сторінці PDF */
  signature: 'До зустрічі на занятті 🤍',
} as const;

/** Посилання з UTM-міткою для PDF. */
export const bookingUrlForPdf = `${school.bookingUrl}?utm_source=pdf&utm_medium=consultation`;
