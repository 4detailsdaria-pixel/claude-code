import { Font } from '@react-pdf/renderer';
import eUkraineLight from '../assets/pdf-fonts/eUkraine-Light.ttf';
import eUkraineRegular from '../assets/pdf-fonts/eUkraine-Regular.ttf';
import eUkraineMedium from '../assets/pdf-fonts/eUkraine-Medium.ttf';
import eUkraineBold from '../assets/pdf-fonts/eUkraine-Bold.ttf';
import eUkraineHeadLight from '../assets/pdf-fonts/eUkraineHead-Light.ttf';
import eUkraineHeadMedium from '../assets/pdf-fonts/eUkraineHead-Medium.ttf';

let registered = false;

/**
 * Брендові шрифти для PDF. Сабсет містить повну українську кирилицю —
 * саме це закриває вимогу «кирилиця має рендеритись коректно».
 *
 * У single-file збірці шрифти приходять як data: URI, і @react-pdf
 * декодує їх через atob, без мережевих запитів.
 */
export function registerPdfFonts(): void {
  if (registered) return;
  registered = true;

  Font.register({
    family: 'eUkraine',
    fonts: [
      { src: eUkraineLight, fontWeight: 300 },
      { src: eUkraineRegular, fontWeight: 400 },
      { src: eUkraineMedium, fontWeight: 500 },
      { src: eUkraineBold, fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'eUkraineHead',
    fonts: [
      { src: eUkraineHeadLight, fontWeight: 300 },
      { src: eUkraineHeadMedium, fontWeight: 500 },
    ],
  });

  // Переноси слів вимикаємо: автоматичний алгоритм не знає українських правил
  // і рве слова навмання.
  Font.registerHyphenationCallback((word) => [word]);
}

/**
 * Емодзі не входять у брендові шрифти — у PDF вони стали б порожніми
 * прямокутниками. На екрані емодзі лишаються, у PDF прибираємо.
 */
export function stripEmoji(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
