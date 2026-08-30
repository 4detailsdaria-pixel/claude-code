import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { Editable } from '../components/Editable';
import { formats, alternativesOrder, pairNote } from '../config/formats';
import { recommendFormat } from '../lib/recommend';
import type { FormatType, Frequency } from '../types';
import { timesPerWeek } from '../lib/format';

/** Екран 5 · Формат навчання (презентаційний). */
export function Screen5Format() {
  const { session, update, text, setText } = useSession();

  const auto = recommendFormat(session);
  const format = (session.recommendedFormat || auto.format) as FormatType;
  const reason = session.formatReason || auto.reason;

  const alternatives = alternativesOrder.filter((f) => f !== format).slice(0, 2);

  return (
    <Stage eyebrow="Формат навчання">
      {/* Приватний оверлей: перевизначення рекомендації вручну.
          У презентаційному режимі майже невидимий, проявляється при наведенні. */}
      <div className="no-print mb-5 flex items-center gap-2 opacity-0 transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100">
        <span className="text-[11px] text-grey">формат:</span>
        <select
          value={format}
          onChange={(e) => {
            const next = e.target.value as FormatType;
            update({
              recommendedFormat: next,
              formatOverridden: next !== auto.format,
              formatReason: next === auto.format ? '' : session.formatReason,
            });
          }}
          className="rounded border border-line bg-white px-2 py-1 text-[11px] text-grey"
        >
          {Object.entries(formats).map(([k, v]) => (
            <option key={k} value={k}>
              {v.title}
            </option>
          ))}
        </select>
        <select
          value={session.frequency}
          onChange={(e) => update({ frequency: Number(e.target.value) as Frequency })}
          className="rounded border border-line bg-white px-2 py-1 text-[11px] text-grey"
        >
          {[1, 2, 3].map((n) => (
            <option key={n} value={n}>
              {n}× на тиждень
            </option>
          ))}
        </select>
        {session.formatOverridden && (
          <span className="text-[11px] text-grey/60">· перевизначено вручну</span>
        )}
      </div>

      <div className="rounded-3xl bg-periwinkle px-14 py-12">
        <div className="brand-eyebrow text-[13px] text-black/50">Рекомендуємо</div>
        <div className="brand-title mt-4 text-[46px] leading-none">
          {formats[format].title}
        </div>
        <div className="mt-4 text-[24px] text-black/75">
          {timesPerWeek(session.frequency)}
        </div>
        <Editable
          as="p"
          id="s5.reason"
          value={text('s5.reason', reason)}
          onChange={setText}
          className="mt-8 max-w-[640px] text-[18px] leading-snug text-black/70"
        />
      </div>

      {format === 'pair' && (
        <p className="mt-6 text-[17px] text-black/70">{pairNote}</p>
      )}

      <div className="mt-12">
        <div className="brand-eyebrow mb-4 text-[12px] text-grey">
          Альтернативи, якщо потрібна інша інтенсивність
        </div>
        <ul className="space-y-2">
          {alternatives.map((f) => (
            <li key={f} className="flex gap-3 text-[16px] text-grey">
              <span className="text-grey/40">·</span>
              <span>
                <span className="text-black">{formats[f].title}</span> — {formats[f].blurb}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}
