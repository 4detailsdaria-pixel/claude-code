import { useState } from 'react';
import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { primaryCard, secondaryCard } from '../config/next-steps';
import { school } from '../config/school';
import { addDays, formatDateShort } from '../lib/format';
import { downloadPlanPdf } from '../pdf/generate';

/** Екран 9 · Наступні кроки (презентаційний). */
export function Screen9Next() {
  const { session, derived } = useSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePdf = async () => {
    setBusy(true);
    setError(null);
    try {
      const outcome = await downloadPlanPdf(session, derived);
      if (outcome === 'declined') setError('Збереження скасовано.');
      if (outcome === 'failed') setError('Не вдалося зберегти файл.');
    } catch (e) {
      setError('Не вдалося зібрати PDF. Спробуйте ще раз.');
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stage eyebrow="Наступні кроки">
      <div className="grid grid-cols-[1.35fr_1fr] items-start gap-7">
        {/* Картка A — основна */}
        <div className="rounded-3xl border-2 border-black px-11 py-10">
          <div className="brand-eyebrow text-[15px]">{primaryCard.eyebrow}</div>
          {primaryCard.body.map((line, i) => (
            <p key={i} className="mt-5 text-[19px] leading-snug text-black/80">
              {line}
            </p>
          ))}
          <p className="mt-8 text-[14px] text-grey">
            Актуально до{' '}
            <span className="mark text-black">
              {formatDateShort(addDays(session.createdAt, primaryCard.validForDays))}
            </span>
          </p>
          <a
            href={school.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-block rounded-full bg-black px-8 py-3 text-[15px] text-white"
          >
            {primaryCard.cta}
          </a>
        </div>

        {/* Картка B — другорядна */}
        <div className="rounded-3xl bg-paper px-9 py-9">
          <div className="brand-eyebrow text-[12px] text-grey">{secondaryCard.eyebrow}</div>
          {secondaryCard.body.map((line, i) => (
            <p key={i} className="mt-4 text-[16px] leading-snug text-black/70">
              {line}
            </p>
          ))}
          <p className="mt-7 text-[13px] text-grey">
            Актуально до{' '}
            {formatDateShort(addDays(session.createdAt, secondaryCard.validForDays))}
          </p>
        </div>
      </div>

      <p className="mt-12 text-[18px] text-black/70">{school.signature}</p>

      <div className="no-print mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={handlePdf}
          disabled={busy}
          className="rounded-full border border-black px-7 py-2.5 text-[14px] transition-opacity disabled:opacity-40"
        >
          {busy ? 'Збираємо PDF…' : 'Зберегти план у PDF'}
        </button>
        <button
          type="button"
          onClick={handlePdf}
          disabled={busy}
          className="rounded-full border border-line px-7 py-2.5 text-[14px] text-grey transition-colors hover:border-black/30 disabled:opacity-40"
          title="v1 — просто завантаження файлу"
        >
          Надіслати клієнту
        </button>
        {error && <span className="text-[13px] text-grey">{error}</span>}
      </div>
    </Stage>
  );
}
