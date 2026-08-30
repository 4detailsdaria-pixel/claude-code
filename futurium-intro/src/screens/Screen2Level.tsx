import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { LevelScale } from '../components/LevelScale';
import { Editable } from '../components/Editable';
import { levels, blockerCopy } from '../config/levels';

/** Екран 2 · Ваш рівень (презентаційний). */
export function Screen2Level() {
  const { session, text, setText } = useSession();
  const copy = levels[session.currentLevel];

  // «Над чим працюємо» генерується з блокерів — словами самого клієнта.
  // Якщо блокери не обрано, падаємо на опис рівня.
  const working =
    session.blockers.length > 0
      ? session.blockers.map((b) => blockerCopy[b])
      : copy.working;

  return (
    <Stage eyebrow="Ваш рівень">
      <div className="mb-3 flex items-baseline gap-4">
        <span className="brand-title text-[44px]">{session.currentLevel}</span>
        <span className="text-[20px] text-grey">{copy.title}</span>
      </div>

      <div className="mb-14 mt-10">
        <LevelScale current={session.currentLevel} target={session.targetLevel} />
      </div>

      <div className="grid grid-cols-2 gap-16">
        <div>
          <h3 className="brand-eyebrow mb-5 text-[13px] text-grey">Що ви вже вмієте</h3>
          <ul className="space-y-3.5">
            {copy.can.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-[0.6em] block h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ background: 'var(--futurium-yellow)' }}
                />
                <Editable
                  as="span"
                  id={`s2.can.${i}`}
                  value={text(`s2.can.${i}`, item)}
                  onChange={setText}
                  className="text-[21px] leading-snug"
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="brand-eyebrow mb-5 text-[13px] text-grey">Над чим працюємо</h3>
          <ul className="space-y-3.5">
            {working.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-[0.6em] block h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ background: 'var(--futurium-periwinkle)' }}
                />
                <Editable
                  as="span"
                  id={`s2.working.${i}`}
                  value={text(`s2.working.${i}`, item)}
                  onChange={setText}
                  className="text-[21px] leading-snug"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}
