import type { ConsultationSession, Derived } from '../types';
import { pdfFileName } from '../lib/format';
import { saveFile, type SaveOutcome } from '../lib/host-downloads';

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
): Promise<SaveOutcome> {
  const blob = await buildBlob(session, derived);
  return saveFile(pdfFileName(session.clientName, session.createdAt), blob);
}

/** Прев'ю PDF у новій вкладці — щоб перевірити макет, не качаючи файл. */
export async function openPlanPdf(
  session: ConsultationSession,
  derived: Derived,
): Promise<string> {
  return URL.createObjectURL(await buildBlob(session, derived));
}
