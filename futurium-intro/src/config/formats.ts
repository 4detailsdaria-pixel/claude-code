// ЗАПОВНЮЄ ШКОЛА — це чернетка логіки й цін, потребує підтвердження засновниці.

import type { FormatType, Frequency, GoalType, ScheduleType, Level } from '../types';

export interface FormatCopy {
  title: string;
  /** Коротке пояснення для блоку альтернатив */
  blurb: string;
}

export const formats: Record<FormatType, FormatCopy> = {
  individual: {
    title: 'Індивідуально',
    blurb: 'весь час уроку — ваш, темп під вас',
  },
  'individual-senior': {
    title: 'Індивідуально Senior',
    blurb: 'викладачка з досвідом у вашій сфері',
  },
  'individual-advanced': {
    title: 'Індивідуально Advanced',
    blurb: 'підготовка під конкретний формат — іспит, співбесіда, переговори',
  },
  pair: {
    title: 'У парі',
    blurb: 'дешевше, більше говоріння, ніж у групі',
  },
  'mini-group': {
    title: 'У міні-групі',
    blurb: 'найдоступніший варіант, до 4 осіб',
  },
};

/** Порядок, у якому показуються альтернативи під рекомендацією. */
export const alternativesOrder: FormatType[] = ['pair', 'mini-group', 'individual'];

// ── Ціни ───────────────────────────────────────────────────────────
// ЗАПОВНЮЄ ШКОЛА — плейсхолдери. Ціна за один урок, грн.
// Розмір пакета = уроків на місяць (частота × 4).

export const pricePerLesson: Record<FormatType, Record<number, number>> = {
  individual: { 4: 800, 8: 775, 12: 750 },
  'individual-senior': { 4: 950, 8: 925, 12: 900 },
  'individual-advanced': { 4: 1100, 8: 1075, 12: 1050 },
  pair: { 4: 550, 8: 525, 12: 500 },
  'mini-group': { 4: 420, 8: 400, 12: 380 },
};

// ── Логіка рекомендації ────────────────────────────────────────────
// ЗАПОВНЮЄ ШКОЛА — це чернетка логіки, потребує підтвердження засновниці.
// Правила перевіряються згори вниз, спрацьовує ПЕРШЕ підхоже.

export interface RuleCondition {
  schedule?: ScheduleType;
  goal?: GoalType;
  /** Спрацьовує, якщо поточний рівень входить у перелік */
  currentLevel?: Level[];
}

export interface FormatRule {
  if: RuleCondition;
  recommend: FormatType;
  reason: string;
  frequency?: Frequency;
}

export const rules: FormatRule[] = [
  {
    if: { goal: 'exam' },
    recommend: 'individual-advanced',
    reason: 'підготовка до іспиту потребує роботи під конкретний формат тесту',
    frequency: 2,
  },
  {
    if: { goal: 'relocation' },
    recommend: 'individual',
    reason: 'переїзд — це строк, а індивідуальний темп дає найшвидший рух',
    frequency: 3,
  },
  {
    if: { schedule: 'flexible' },
    recommend: 'individual',
    reason: 'у вас плаваючий графік — індивідуальні заняття легко переносити',
    frequency: 2,
  },
  {
    if: { goal: 'confidence', schedule: 'stable' },
    recommend: 'pair',
    reason: 'для практики говоріння формат у парі дає більше часу на кожного',
    frequency: 2,
  },
  {
    if: { goal: 'career', currentLevel: ['B1', 'B2', 'C1'] },
    recommend: 'individual-senior',
    reason: 'робочі задачі краще розбирати з викладачкою з вашої сфери',
    frequency: 2,
  },
];

/** Якщо жодне правило не спрацювало. */
export const fallbackRule: Omit<FormatRule, 'if'> = {
  recommend: 'individual',
  reason: 'індивідуальний формат дає найбільше часу говоріння на занятті',
  frequency: 2,
};

/** Текст, що з'являється під блоком, якщо рекомендовано «У парі». */
export const pairNote = 'Не маєте пари? Ми підберемо партнера вашого рівня й цілі.';
