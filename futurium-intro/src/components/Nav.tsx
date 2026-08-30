import { Logo } from './Logo';

interface Props {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  presenting: boolean;
  clientName: string;
}

/**
 * У приватному режимі — повна панель із точками-індикаторами.
 * У презентаційному — майже невидимі стрілки внизу, що проявляються
 * при наведенні: клієнт бачить презентацію, не інтерфейс.
 */
export function Nav({ step, total, onPrev, onNext, onExit, presenting, clientName }: Props) {
  if (presenting) {
    return (
      <div className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center pb-5">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/70 px-2 py-1 opacity-[0.14] backdrop-blur transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100">
          <NavButton onClick={onPrev} disabled={step === 0} label="Назад">
            ←
          </NavButton>
          <span className="min-w-[54px] text-center text-[11px] tabular-nums text-grey">
            {step - 1} / {total - 2}
          </span>
          <NavButton onClick={onNext} disabled={step === total - 1} label="Далі">
            →
          </NavButton>
          <span className="mx-1 h-4 w-px bg-line" />
          <button
            type="button"
            onClick={onExit}
            className="rounded-full px-3 py-1 text-[11px] text-grey hover:text-black"
          >
            вийти
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="no-print flex h-14 shrink-0 items-center justify-between border-b border-line px-8">
      <div className="flex items-center gap-4">
        <Logo height={22} />
        <span className="text-[13px] text-grey">{clientName || 'Нова консультація'}</span>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="block h-1.5 rounded-full transition-all duration-200"
            style={{
              width: i === step ? 18 : 6,
              background: i === step ? 'var(--futurium-black)' : 'var(--futurium-line)',
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={step === 0}
          className="rounded-full border border-line px-4 py-1.5 text-[13px] disabled:opacity-30"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={step === total - 1}
          className="rounded-full bg-black px-5 py-1.5 text-[13px] text-white disabled:opacity-30"
        >
          Далі
        </button>
      </div>
    </header>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="rounded-full px-3 py-1 text-[15px] text-grey hover:text-black disabled:opacity-25"
    >
      {children}
    </button>
  );
}
