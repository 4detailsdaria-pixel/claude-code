// ЗАПОВНЮЄ ШКОЛА — плейсхолдери замінити на реальні дані.
// Дедлайни рахуються автоматично від дати консультації.

export interface NextStepCard {
  eyebrow: string;
  body: string[];
  /** Через скільки днів від консультації спливає пропозиція */
  validForDays: number;
  cta: string;
}

export const primaryCard: NextStepCard = {
  eyebrow: 'Перше заняття · 500 грн',
  body: [
    'Це не демоурок. Ми вже знаємо ваш рівень і запит — викладачка готує матеріал саме під вас.',
    'Ви виходите з відпрацьованим планом.',
  ],
  validForDays: 7,
  cta: 'Обрати час',
};

export const secondaryCard: NextStepCard = {
  eyebrow: 'Почати навчання',
  body: ['[бонус або умова — заповнює школа]'],
  validForDays: 3,
  cta: 'Обговорити старт',
};
