// Довідники інтерфейсу. Переліки валідовані на реальних даних аудиторії —
// не змінювати без потреби.

import type { FieldType, SourceType, ExperienceType, BlockerType } from '../types';

export const fieldLabels: Record<FieldType, string> = {
  it: 'IT / Розробка',
  data: 'Data / Аналітика',
  marketing: 'Маркетинг',
  design: 'Дизайн',
  sales: 'Продажі',
  finance: 'Фінанси',
  hr: 'HR',
  education: 'Освіта',
  medicine: 'Медицина',
  law: 'Юриспруденція',
  business: 'Бізнес',
  other: 'Інше',
};

export const sourceLabels: Record<SourceType, string> = {
  instagram: 'Instagram',
  threads: 'Threads',
  ads: 'Реклама',
  referral: 'Рекомендація',
  youtube: 'YouTube',
  telegram: 'Telegram',
  other: 'Інше',
};

export const experienceLabels: Record<ExperienceType, string> = {
  'school-only': 'Тільки школа',
  'courses-long-ago': 'Курси давно',
  'tutor-recently': 'Репетитор нещодавно',
  'self-study': 'Вчив(ла) сам(а)',
  'lived-abroad': 'Жив(ла) за кордоном',
  none: 'Практично з нуля',
};

export const blockerLabels: Record<BlockerType, string> = {
  'understand-cant-speak': 'Розумію, але важко сказати',
  'forget-words': 'Забуваю слова',
  'afraid-mistakes': 'Боюся помилок',
  'grammar-unused': 'Знаю граматику, але не використовую',
  'no-regularity': 'Немає регулярності',
  listening: 'Важко сприймати на слух',
};
