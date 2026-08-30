// Модель даних сесії. Назви полів обрані так, щоб мапитись на поля CRM
// без перейменувань, коли з'явиться бекенд.

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export type FieldType =
  | 'it' | 'data' | 'marketing' | 'design' | 'sales' | 'finance'
  | 'hr' | 'education' | 'medicine' | 'law' | 'business' | 'other';

export type GoalType =
  | 'career' | 'confidence' | 'exam' | 'relocation'
  | 'travel' | 'study-abroad' | 'self';

export type GapType =
  | 'meetings' | 'interviews' | 'writing' | 'foreign-clients'
  | 'networking' | 'presentations' | 'travel' | 'content';

export type BlockerType =
  | 'understand-cant-speak' | 'forget-words' | 'afraid-mistakes'
  | 'grammar-unused' | 'no-regularity' | 'listening';

export type FormatType =
  | 'individual' | 'individual-senior' | 'individual-advanced'
  | 'pair' | 'mini-group';

export type SourceType =
  | 'instagram' | 'threads' | 'ads' | 'referral'
  | 'youtube' | 'telegram' | 'other';

export type ExperienceType =
  | 'school-only' | 'courses-long-ago' | 'tutor-recently'
  | 'self-study' | 'lived-abroad' | 'none';

export type ScheduleType = 'stable' | 'flexible';

export type Frequency = 1 | 2 | 3;

export interface Checkpoint {
  /** Номер уроку, на якому робиться зріз (0 = старт) */
  lesson: number;
  label: string;
  /** Що саме перевіряємо на цьому зрізі */
  detail: string;
}

export interface ConsultationSession {
  // Мета
  id: string;
  createdAt: string;
  updatedAt: string;

  // Екран 0 — до дзвінка
  clientName: string;
  telegram?: string;
  statedGoal?: string;
  source?: SourceType;

  // Екран 1 — приватний
  currentLevel: Level;
  targetLevel: Level;
  field: FieldType | '';
  goal: GoalType | '';
  gaps: GapType[];
  blockers: BlockerType[];
  clientQuote: string;
  schedule: ScheduleType;
  experience: ExperienceType | '';
  notes?: string;

  // Екран 5 — формат
  recommendedFormat: FormatType | '';
  /** true, якщо ведуча перевизначила рекомендацію вручну */
  formatOverridden: boolean;
  frequency: Frequency;
  formatReason?: string;

  /** Правки тексту на льоту в презентаційному режимі.
   *  Ключ — стабільний id поля, значення — те, що ввела ведуча. */
  edits: Record<string, string>;
}

/** Похідні величини — не зберігаються, рахуються з сесії. */
export interface Derived {
  estimatedLessons: number;
  estimatedMonths: [number, number];
  checkpoints: Checkpoint[];
  monthlyPrice: number;
  pricePerLesson: number;
  lessonsPerMonth: number;
}
