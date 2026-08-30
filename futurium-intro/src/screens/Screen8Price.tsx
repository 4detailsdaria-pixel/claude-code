import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { formats } from '../config/formats';
import { formatPrice, timesPerWeek } from '../lib/format';
import { lessonWord } from '../config/checkpoints';
import { recommendFormat } from '../lib/recommend';
import type { FormatType } from '../types';

/**
 * Екран 8 · Вартість (презентаційний).
 * Місячна сума — головна цифра, розшифровка навмисно дрібніша:
 * клієнт має спершу побачити суму, а вже потім її склад.
 */
export function Screen8Price() {
  const { session, derived } = useSession();
  const format = (session.recommendedFormat || recommendFormat(session).format) as FormatType;

  return (
    <Stage>
      <div className="flex flex-col items-center text-center">
        <div className="brand-eyebrow text-[13px] text-grey">Вартість</div>

        <div className="mt-12 flex items-baseline gap-5">
          <span className="brand-title text-[104px] leading-none">
            {formatPrice(derived.monthlyPrice)}
          </span>
          {/* «грн» лишається малими: у верхньому регістрі воно кричить
              голосніше за саму цифру */}
          <span className="font-head text-[34px] normal-case leading-none tracking-[0.08em] text-black/70">
            грн
          </span>
        </div>

        <div className="mt-6 text-[22px] text-grey">на місяць</div>

        <div
          className="mt-12 rounded-full px-8 py-3 text-[19px]"
          style={{ background: 'var(--futurium-periwinkle)' }}
        >
          {formats[format].title} · {timesPerWeek(session.frequency)}
        </div>

        <div className="mt-5 text-[17px] text-grey">
          {derived.lessonsPerMonth} {lessonWord(derived.lessonsPerMonth)} ·{' '}
          {formatPrice(derived.pricePerLesson)} грн за заняття
        </div>
      </div>
    </Stage>
  );
}
