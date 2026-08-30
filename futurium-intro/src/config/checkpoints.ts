// ЗАПОВНЮЄ ШКОЛА — плейсхолдери замінити на реальні дані.
//
// Точки зрізу — найсильніший елемент продажу. Під кожною точкою один рядок:
// що саме перевіряємо на цьому етапі. Текст залежить від ЦІЛЬОВОГО рівня.

import type { Level, Checkpoint } from '../types';

/** Кожні скільки уроків робиться зріз. */
export const CHECKPOINT_EVERY = 8;

/** Скільки точок показуємо на таймлайні (щоб не з'їхала верстка). */
export const MAX_CHECKPOINTS = 3;

type CheckpointCopy = { detail: string };

/** Універсальна послідовність зрізів — індекс = порядковий номер зрізу. */
const sequence: CheckpointCopy[] = [
  { detail: 'базова лексика теми в активі, перші діалоги без підказок' },
  { detail: 'говоріння в темпі: менше пауз, довші репліки' },
  { detail: 'граматика в мовленні, не в вправах' },
  { detail: 'сприйняття на слух у природному темпі' },
  { detail: 'самостійна аргументація на робочу тему' },
];

/** Точкові уточнення під цільовий рівень. ЗАПОВНЮЄ ШКОЛА. */
const byTargetLevel: Partial<Record<Level, string[]>> = {
  B1: [
    'побутові теми без підготовки',
    'робоче листування без перекладача',
    'розмова на 10 хвилин без переходу на українську',
  ],
  B2: [
    'мітинг: розумієте все, вставляєте репліки',
    'аргументація без підготовки на робочу тему',
    'співбесіда англійською в тренувальному форматі',
  ],
  C1: [
    'спонтанна дискусія без падіння темпу',
    'презентація перед групою',
    'переговори з утриманням позиції',
  ],
};

export function buildCheckpoints(target: Level, totalLessons: number): Checkpoint[] {
  const specific = byTargetLevel[target];
  const count = Math.min(
    MAX_CHECKPOINTS,
    Math.max(1, Math.floor(totalLessons / CHECKPOINT_EVERY)),
  );
  const points: Checkpoint[] = [
    { lesson: 0, label: 'старт', detail: 'фіксуємо точку А — від чого рахуємо прогрес' },
  ];
  for (let i = 0; i < count; i++) {
    const lesson = (i + 1) * CHECKPOINT_EVERY;
    points.push({
      lesson,
      label: `${lesson} ${lessonWord(lesson)}`,
      detail: specific?.[i] ?? sequence[i % sequence.length].detail,
    });
  }
  return points;
}

export function lessonWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'уроків';
  if (mod10 === 1) return 'урок';
  if (mod10 >= 2 && mod10 <= 4) return 'уроки';
  return 'уроків';
}
