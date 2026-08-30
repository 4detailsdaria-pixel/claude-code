/** Форматування чисел і дат — українська локаль, нерозривні пробіли в цінах. */

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 })
    .format(value)
    .replace(/ /g, ' ');
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long' }).format(
    new Date(iso),
  );
}

/** Дата + N днів, у ISO. */
export function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function monthWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'місяців';
  if (mod10 === 1) return 'місяць';
  if (mod10 >= 2 && mod10 <= 4) return 'місяці';
  return 'місяців';
}

export function timesPerWeek(n: number): string {
  return n === 1 ? '1 раз на тиждень' : `${n} рази на тиждень`;
}

/** Місцевий відмінок — для фрази «...при 2 заняттях на тиждень». */
export function lessonsPerWeekPhrase(n: number): string {
  return n === 1 ? '1 занятті на тиждень' : `${n} заняттях на тиждень`;
}

/** Ім'я файлу PDF: Futurium_план_[ім'я]_[дата].pdf */
export function pdfFileName(clientName: string, iso: string): string {
  const safe = (clientName || 'клієнт').trim().replace(/[\\/:*?"<>|\s]+/g, '_');
  const d = new Date(iso);
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
  return `Futurium_план_${safe}_${date}.pdf`;
}
