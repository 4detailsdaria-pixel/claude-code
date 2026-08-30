// ЗАПОВНЮЄ ШКОЛА — плейсхолдери замінити на реальні дані.
//
// Скільки уроків займає перехід між сусідніми рівнями.
// Строк у місяцях рахується як: уроки / (частота × 4), із похибкою ±1 місяць.
// Значення нижче — чернетка на основі загальноприйнятих оцінок CEFR,
// потребує підтвердження засновниці.

import type { Level } from '../types';
import { LEVELS } from '../types';

/** Уроків на перехід «з рівня → на наступний». */
// Відкалібровано під приклад із ТЗ: B1→B2 при 2 заняттях на тиждень
// має давати 6–7 місяців (52 уроки ÷ 8 на місяць = 6,5).
export const lessonsPerStep: Record<string, number> = {
  'A1→A2': 40,
  'A2→B1': 46,
  'B1→B2': 52,
  'B2→C1': 64,
  'C1→C2': 76,
};

/** Скільки уроків від поточного рівня до цільового (сума кроків). */
export function lessonsBetween(from: Level, to: Level): number {
  const fromIdx = LEVELS.indexOf(from);
  const toIdx = LEVELS.indexOf(to);
  if (toIdx <= fromIdx) return 0;
  let total = 0;
  for (let i = fromIdx; i < toIdx; i++) {
    total += lessonsPerStep[`${LEVELS[i]}→${LEVELS[i + 1]}`] ?? 80;
  }
  return total;
}

/** Умовних занять на місяць при частоті N разів на тиждень. */
export const WEEKS_PER_MONTH = 4;
