import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { Timeline } from '../components/Timeline';
import { Editable } from '../components/Editable';
import { monthWord, lessonsPerWeekPhrase } from '../lib/format';

/** Екран 4 · Скільки це займе (презентаційний). Найважливіший конверсійний. */
export function Screen4Duration() {
  const { session, derived, text, setText } = useSession();
  const [lo, hi] = derived.estimatedMonths;
  const sameLevel = session.currentLevel === session.targetLevel;

  const line = sameLevel
    ? 'підтримуємо й поглиблюємо рівень'
    : `орієнтовно ${lo}–${hi} ${monthWord(hi)} при ${lessonsPerWeekPhrase(session.frequency)}`;

  return (
    <Stage eyebrow="Скільки це займе">
      <div className="flex items-baseline gap-6">
        <span className="brand-title text-[64px] leading-none">
          {session.currentLevel}
        </span>
        <span className="text-[40px] leading-none text-grey/40">→</span>
        <span className="brand-title text-[64px] leading-none">
          <span className="mark">{session.targetLevel}</span>
        </span>
      </div>

      <Editable
        as="p"
        id="s4.estimate"
        value={text('s4.estimate', line)}
        onChange={setText}
        className="mt-6 text-[24px] leading-snug text-black/80"
      />

      {!sameLevel && (
        <p className="mt-2 text-[15px] text-grey">
          це {derived.estimatedLessons} уроків · {derived.lessonsPerMonth} на місяць
        </p>
      )}

      <div className="mt-16">
        <h3 className="brand-eyebrow mb-8 text-[13px] text-grey">Точки зрізу</h3>
        <Timeline points={derived.checkpoints} />
      </div>

      <p className="mt-14 max-w-[700px] text-[15px] leading-relaxed text-grey">
        Кожні 8 уроків ми фіксуємо, що змінилось. Ви бачите прогрес у конкретиці,
        а не покладаєтесь на відчуття.
      </p>
    </Stage>
  );
}
