import { useState } from 'react';
import type { ConsultationSession, SourceType } from '../types';
import { sourceLabels } from '../config/dictionaries';
import { Select } from '../components/Chip';
import { Logo } from '../components/Logo';
import { formatDateShort } from '../lib/format';
import { deleteSession, exportAllAsJson } from '../lib/storage';

interface Props {
  saved: ConsultationSession[];
  onStart: (draft: Partial<ConsultationSession>) => void;
  onOpen: (s: ConsultationSession) => void;
  onDemo: () => void;
  onRefresh: () => void;
}

/** Екран 0 · Підготовка (до дзвінка, приватний). */
export function Screen0Prep({ saved, onStart, onOpen, onDemo, onRefresh }: Props) {
  const [clientName, setClientName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [statedGoal, setStatedGoal] = useState('');
  const [source, setSource] = useState<SourceType | ''>('');

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[880px] flex-col px-8 py-10">
      <header className="mb-10 flex items-center justify-between">
        <Logo variant="full" height={44} />
        <span className="brand-eyebrow text-[12px] text-grey">Інтро-консультація</span>
      </header>

      <div className="grid grid-cols-[1.15fr_1fr] gap-14">
        <section>
          <h1 className="brand-title mb-6 text-[28px]">Нова консультація</h1>

          <div className="space-y-4">
            <Field label="Ім’я клієнта">
              <input
                autoFocus
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Олена"
                className="w-full rounded-lg border border-line px-3 py-2 text-[15px] outline-none focus:border-black/50"
              />
            </Field>

            <Field label="Telegram" optional>
              <input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@nickname"
                className="w-full rounded-lg border border-line px-3 py-2 text-[15px] outline-none focus:border-black/50"
              />
            </Field>

            <Field label="Для чого вам англійська" optional hint="з форми запису">
              <textarea
                value={statedGoal}
                onChange={(e) => setStatedGoal(e.target.value)}
                rows={2}
                placeholder="те, що людина написала при записі"
                className="w-full resize-none rounded-lg border border-line px-3 py-2 text-[15px] outline-none focus:border-black/50"
              />
            </Field>

            <Field label="Звідки прийшов лід" optional>
              <Select
                value={source}
                onChange={(v) => setSource(v)}
                options={sourceLabels}
                placeholder="—"
              />
            </Field>
          </div>

          <button
            type="button"
            onClick={() => onStart({ clientName, telegram, statedGoal, source: source || undefined })}
            disabled={!clientName.trim()}
            className="mt-7 w-full rounded-full bg-black px-6 py-3.5 text-[15px] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
          >
            Почати консультацію
          </button>

          <button
            type="button"
            onClick={onDemo}
            className="mt-3 w-full rounded-full border border-line px-6 py-2.5 text-[13px] text-grey hover:border-black/30"
          >
            Відкрити демо-сесію із заглушками
          </button>
        </section>

        <section>
          <h2 className="brand-eyebrow mb-4 text-[12px] text-grey">Останні сесії</h2>
          {saved.length === 0 ? (
            <p className="text-[14px] text-grey/70">Поки порожньо.</p>
          ) : (
            <ul className="space-y-1">
              {saved.slice(0, 12).map((s) => (
                <li key={s.id} className="group flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpen(s)}
                    className="flex-1 rounded-lg px-3 py-2.5 text-left hover:bg-paper"
                  >
                    <span className="block text-[15px]">
                      {s.clientName || 'Без імені'}
                    </span>
                    <span className="block text-[12px] text-grey">
                      {formatDateShort(s.createdAt)} · {s.currentLevel} → {s.targetLevel}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Видалити сесію"
                    onClick={() => {
                      deleteSession(s.id);
                      onRefresh();
                    }}
                    className="opacity-0 transition-opacity group-hover:opacity-100 px-2 text-[18px] leading-none text-grey hover:text-black"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {saved.length > 0 && (
            <button
              type="button"
              onClick={exportAllAsJson}
              className="mt-5 text-[12px] text-grey underline underline-offset-4 hover:text-black"
            >
              Експортувати всі сесії у JSON
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  optional,
  hint,
  children,
}: {
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] text-grey">
        {label}
        {optional && <span className="text-grey/50"> · опційно</span>}
        {hint && <span className="text-grey/50"> · {hint}</span>}
      </span>
      {children}
    </label>
  );
}
