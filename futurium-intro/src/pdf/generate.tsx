import type { ConsultationSession, Derived } from '../types';
import { pdfFileName } from '../lib/format';

/**
 * PDF важкий (~1 МБ бандла), тому підвантажується лише коли його справді
 * просять — щоб не гальмувати старт застосунку перед дзвінком.
 */
async function buildBlob(
  session: ConsultationSession,
  derived: Derived,
): Promise<Blob> {
  const [{ pdf }, { PlanDocument }, { registerPdfFonts }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./PlanDocument'),
    import('./fonts'),
  ]);

  registerPdfFonts();
  return pdf(<PlanDocument session={session} derived={derived} />).toBlob();
}

export async function downloadPlanPdf(
  session: ConsultationSession,
  derived: Derived,
): Promise<void> {
  const blob = await buildBlob(session, derived);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = pdfFileName(session.clientName, session.createdAt);
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Даємо браузеру встигнути почати завантаження
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Прев'ю PDF у новій вкладці — щоб перевірити макет, не качаючи файл. */
export async function openPlanPdf(
  session: ConsultationSession,
  derived: Derived,
): Promise<string> {
  return URL.createObjectURL(await buildBlob(session, derived));
}
