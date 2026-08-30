import type { Checkpoint } from '../types';

/**
 * Горизонтальний таймлайн точок зрізу.
 * Це найсильніший елемент продажу — він має читатись миттєво.
 */
export function Timeline({ points }: { points: Checkpoint[] }) {
  return (
    <div className="w-full">
      <div className="relative" style={{ height: 18 }}>
        <div
          className="absolute rounded-full bg-line"
          style={{
            top: 8,
            height: 2,
            left: `${50 / points.length}%`,
            right: `${50 / points.length}%`,
          }}
        />
        <div className="absolute inset-0 flex">
          {points.map((p, i) => (
            <div key={p.lesson} className="flex flex-1 items-center justify-center">
              <span
                className="block rounded-full"
                style={{
                  width: 18,
                  height: 18,
                  background: i === 0 ? 'var(--futurium-white)' : 'var(--futurium-yellow)',
                  border: '2px solid var(--futurium-black)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex">
        {points.map((p) => (
          <div key={p.lesson} className="flex-1 px-2 text-center">
            <div className="brand-eyebrow text-[12px] text-black">{p.label}</div>
            <div className="mx-auto mt-2 max-w-[210px] text-[15px] leading-snug text-grey">
              {p.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
