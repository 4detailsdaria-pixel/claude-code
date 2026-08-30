import { LEVELS, type Level } from '../types';

interface Props {
  current: Level;
  target: Level;
  /** Компактний варіант для приватних екранів */
  compact?: boolean;
}

/**
 * Горизонтальна шкала A1…C2. Поточний рівень — заповнена жовта крапка,
 * цільовий — контурна, відрізок між ними підсвічений.
 */
export function LevelScale({ current, target, compact }: Props) {
  const ci = LEVELS.indexOf(current);
  const ti = LEVELS.indexOf(target);
  const last = LEVELS.length - 1;
  const pct = (i: number) => (i / last) * 100;

  const from = Math.min(ci, ti);
  const to = Math.max(ci, ti);

  const dot = compact ? 12 : 20;

  return (
    <div className={compact ? 'w-full' : 'w-full max-w-4xl'}>
      <div className="relative" style={{ height: dot * 2 }}>
        {/* базова лінія */}
        <div
          className="absolute left-0 right-0 rounded-full bg-line"
          style={{ top: dot - 1, height: 2 }}
        />
        {/* підсвічений відрізок «звідки → куди» */}
        <div
          className="absolute rounded-full bg-black"
          style={{
            top: dot - 1.5,
            height: 3,
            left: `${pct(from)}%`,
            width: `${pct(to) - pct(from)}%`,
          }}
        />
        {LEVELS.map((lvl, i) => {
          const isCurrent = i === ci;
          const isTarget = i === ti;
          const size = isCurrent || isTarget ? dot : dot * 0.42;
          return (
            <div
              key={lvl}
              className="absolute -translate-x-1/2 rounded-full"
              style={{
                left: `${pct(i)}%`,
                top: dot - size / 2,
                width: size,
                height: size,
                background: isCurrent
                  ? 'var(--futurium-yellow)'
                  : isTarget
                    ? 'var(--futurium-white)'
                    : 'var(--futurium-line)',
                border: isCurrent
                  ? '2px solid var(--futurium-black)'
                  : isTarget
                    ? '2px solid var(--futurium-black)'
                    : 'none',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>

      {/* підписи рівнів */}
      <div className="relative mt-1" style={{ height: compact ? 18 : 26 }}>
        {LEVELS.map((lvl, i) => (
          <span
            key={lvl}
            className={[
              'absolute -translate-x-1/2 font-head tracking-[0.14em]',
              compact ? 'text-[11px]' : 'text-[15px]',
              i === ci || i === ti ? 'text-black' : 'text-grey/50',
            ].join(' ')}
            style={{ left: `${pct(i)}%` }}
          >
            {lvl}
          </span>
        ))}
      </div>

      {/* підписи «ви зараз» / «ваша ціль» */}
      {!compact && (
        <div className="relative mt-2" style={{ height: 22 }}>
          <span
            className="absolute -translate-x-1/2 whitespace-nowrap text-[13px] text-grey"
            style={{ left: `${pct(ci)}%` }}
          >
            ви зараз
          </span>
          {ti !== ci && (
            <span
              className="absolute -translate-x-1/2 whitespace-nowrap text-[13px] text-grey"
              style={{ left: `${pct(ti)}%` }}
            >
              ваша ціль
            </span>
          )}
        </div>
      )}
    </div>
  );
}
