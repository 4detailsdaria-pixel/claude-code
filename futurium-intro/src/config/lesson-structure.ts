// ЗАПОВНЮЄ ШКОЛА — плейсхолдери замінити на реальні дані.
// Це те, що зараз показується на дошці в Miro.

export interface LessonStage {
  title: string;
  description: string;
  /** Приблизна тривалість етапу, хв — опційно */
  minutes?: number;
}

export const lessonStages: LessonStage[] = [
  { title: 'Розігрів', description: 'кілька хвилин вільної розмови, щоб перемкнутись на англійську', minutes: 5 },
  { title: 'Повторення', description: 'швидка перевірка того, що було минулого разу', minutes: 5 },
  { title: 'Нова тема', description: 'лексика й конструкції під ваш запит', minutes: 15 },
  { title: 'Практика', description: 'говоріння в ситуаціях, у яких ви реально опинитесь', minutes: 20 },
  { title: 'Зворотний зв’язок', description: 'що вийшло, що беремо в роботу', minutes: 5 },
];

/** Слот під зображення реального уроку. Файл підставить школа.
 *  Покласти в src/assets/lesson/ і імпортувати сюди. */
export const lessonImage: string | null = null;

/** Шаблон рядка персоналізації. {field} — сфера клієнта. */
export const personalizationTemplate = 'тема під ваш запит: {field}';
