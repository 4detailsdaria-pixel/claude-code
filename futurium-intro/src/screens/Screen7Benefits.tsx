import { Stage } from '../components/Shell';
import { Check } from '../components/Check';
import { benefits } from '../config/benefits';

/** Екран 7 · Що входить у вартість (презентаційний). Читається за 20 секунд. */
export function Screen7Benefits() {
  return (
    <Stage eyebrow="Що входить у вартість">
      <ul className="mt-2 space-y-6">
        {benefits.map((b) => (
          <li key={b.title} className="flex gap-5">
            <span className="mt-[2px]">
              <Check size={28} />
            </span>
            <div>
              <div className="text-[22px] leading-snug">{b.title}</div>
              {b.note && (
                <div className="mt-1 text-[15px] leading-snug text-grey">{b.note}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
