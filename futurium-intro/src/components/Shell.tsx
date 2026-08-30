import type { ReactNode } from 'react';

/**
 * Обгортка презентаційного екрана. Один макет на всі екрани 2–9:
 * багато повітря, вміст по центру, нуль службових елементів.
 */
export function Stage({
  eyebrow,
  children,
  className = '',
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center px-[7vw] py-[6vh]">
      <div className={`w-full max-w-[1120px] ${className}`}>
        {eyebrow && (
          <div className="brand-eyebrow mb-8 text-[13px] text-grey">{eyebrow}</div>
        )}
        {children}
      </div>
    </div>
  );
}

/** Заголовок приватного екрана. */
export function PrivateHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-5">
      <h1 className="brand-title text-[26px]">{title}</h1>
      {hint && <p className="mt-1 text-[13px] text-grey">{hint}</p>}
    </div>
  );
}
