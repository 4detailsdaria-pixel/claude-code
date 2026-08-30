import type { ConsultationSession, Derived, FormatType } from '../types';
import { lessonsBetween, WEEKS_PER_MONTH } from '../config/durations';
import { buildCheckpoints } from '../config/checkpoints';
import { pricePerLesson } from '../config/formats';
import { recommendFormat } from './recommend';

/** Ціна за урок для формату й розміру пакета; бере найближчий менший пакет. */
export function lookupPricePerLesson(format: FormatType, lessonsPerMonth: number): number {
  const table = pricePerLesson[format];
  if (!table) return 0;
  const sizes = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);
  let chosen = sizes[0];
  for (const size of sizes) if (lessonsPerMonth >= size) chosen = size;
  return table[chosen] ?? 0;
}

export function derive(s: ConsultationSession): Derived {
  const estimatedLessons = lessonsBetween(s.currentLevel, s.targetLevel);
  const lessonsPerMonth = s.frequency * WEEKS_PER_MONTH;

  // Строк подається вилкою ±1 місяць — обіцяти точну цифру некоректно.
  const raw = estimatedLessons / lessonsPerMonth;
  const low = Math.max(1, Math.floor(raw));
  const estimatedMonths: [number, number] = [low, low + 1];

  const format = (s.recommendedFormat || recommendFormat(s).format) as FormatType;
  const perLesson = lookupPricePerLesson(format, lessonsPerMonth);

  return {
    estimatedLessons,
    estimatedMonths,
    checkpoints: buildCheckpoints(s.targetLevel, estimatedLessons),
    monthlyPrice: perLesson * lessonsPerMonth,
    pricePerLesson: perLesson,
    lessonsPerMonth,
  };
}
