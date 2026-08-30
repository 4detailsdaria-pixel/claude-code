import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { formats } from '../config/formats';
import { formatPrice, timesPerWeek } from '../lib/format';
import { lessonWord } from '../config/checkpoints';
import { recommendFormat } from '../lib/recommend';
import type { FormatType } from '../types';

/** Екран 8 · Вартість (презентаційний). Місячна сума — головна цифра. */
export function Screen8Price() {
  const { session, derived } = useSession();
  const format = (session.recommendedFormat || recommendFormat(session).format) as FormatType;

  return (
    <Stage eyebrow="Вартість">
      <div className="flex flex-col items-center py-10 text-center">
        <div className="brand-title text-[96px] leading-none">
          {formatPrice(derived.monthlyPrice)} грн
        </div>
        <div className="mt-4 text-[24px] text-grey">на місяць</div>

        <div className="mt-14 h-px w-24 bg-line" />

        <div className="mt-10 text-[20px] text-black/80">
          {formats[format].title} · {timesPerWeek(session.frequency)}
        </div>
        <div className="mt-2 text-[18px] text-grey">
          {derived.lessonsPerMonth} {lessonWord(derived.lessonsPerMonth)} ·{' '}
          {formatPrice(derived.pricePerLesson)} грн за заняття
        </div>
      </div>
    </Stage>
  );
}
