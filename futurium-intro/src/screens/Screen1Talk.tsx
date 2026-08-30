import { useState } from 'react';
import { LEVELS, type Level, type GoalType, type GapType, type BlockerType, type FieldType, type ExperienceType } from '../types';
import { useSession } from '../state';
import { Chip, Select } from '../components/Chip';
import { talkPrompts } from '../config/prompts';
import { goalLabels, gapLabels } from '../config/goals';
import { blockerLabels, fieldLabels, experienceLabels } from '../config/dictionaries';

/**
 * Екран 1 · Розмова (приватний).
 * Вимога: усе вміщається на 1440×900 без скролу, введення — кліками.
 */
export function Screen1Talk() {
  const { session, update } = useSession();
  const [notesOpen, setNotesOpen] = useState(Boolean(session.notes));

  const toggle = <T,>(list: T[], v: T): T[] =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  return (
    <div className="grid h-full grid-cols-[minmax(230px,28%)_1fr] gap-8 px-8 py-5">
      {/* ── Ліва колонка: опори для розмови ─────────────────────── */}
      <aside className="border-r border-line pr-7">
        <div className="mb-5">
          <div className="brand-eyebrow text-[11px] text-grey/70">Клієнт</div>
          <div className="mt-1 text-[19px]">{session.clientName || '—'}</div>
          {session.telegram && (
            <div className="text-[12px] text-grey">{session.telegram}</div>
          )}
        </div>

        {session.statedGoal && (
          <div className="mb-5 rounded-xl bg-paper p-3">
            <div className="brand-eyebrow mb-1 text-[10px] text-grey/70">З форми запису</div>
            <p className="text-[13px] leading-snug text-black/80">{session.statedGoal}</p>
          </div>
        )}

        {talkPrompts.map((block) => (
          <div key={block.title} className="mb-5">
            <div className="brand-eyebrow mb-2 text-[11px] text-grey/70">{block.title}</div>
            <ul className="space-y-1.5">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2 text-[13px] leading-snug text-grey">
                  <span className="text-grey/40">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* ── Права колонка: поля ─────────────────────────────────── */}
      <div className="min-w-0 space-y-3.5 overflow-hidden">
        <div className="grid grid-cols-2 gap-6">
          <Group label="Рівень зараз">
            <div className="flex gap-1.5">
              {LEVELS.map((l: Level) => (
                <Chip
                  key={l}
                  compact
                  active={session.currentLevel === l}
                  onClick={() => update({ currentLevel: l })}
                >
                  {l}
                </Chip>
              ))}
            </div>
          </Group>

          <Group label="Цільовий рівень">
            <div className="flex gap-1.5">
              {LEVELS.map((l: Level) => (
                <Chip
                  key={l}
                  compact
                  active={session.targetLevel === l}
                  onClick={() => update({ targetLevel: l })}
                >
                  {l}
                </Chip>
              ))}
            </div>
          </Group>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Group label="Сфера">
            <Select<FieldType>
              value={session.field}
              onChange={(v) => update({ field: v })}
              options={fieldLabels}
              placeholder="—"
            />
          </Group>
          <Group label="Досвід">
            <Select<ExperienceType>
              value={session.experience}
              onChange={(v) => update({ experience: v })}
              options={experienceLabels}
              placeholder="—"
            />
          </Group>
        </div>

        <Group label="Мета навчання">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(goalLabels) as GoalType[]).map((g) => (
              <Chip
                key={g}
                active={session.goal === g}
                onClick={() => update({ goal: session.goal === g ? '' : g })}
              >
                {goalLabels[g]}
              </Chip>
            ))}
          </div>
        </Group>

        <Group label="Де бракує" hint="мультивибір">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(gapLabels) as GapType[]).map((g) => (
              <Chip
                key={g}
                active={session.gaps.includes(g)}
                onClick={() => update({ gaps: toggle(session.gaps, g) })}
              >
                {gapLabels[g]}
              </Chip>
            ))}
          </div>
        </Group>

        <Group label="Що заважає" hint="мультивибір">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(blockerLabels) as BlockerType[]).map((b) => (
              <Chip
                key={b}
                active={session.blockers.includes(b)}
                onClick={() => update({ blockers: toggle(session.blockers, b) })}
              >
                {blockerLabels[b]}
              </Chip>
            ))}
          </div>
        </Group>

        <Group label="Цитата клієнта" hint="це стане заголовком екрана 3">
          <input
            value={session.clientQuote}
            onChange={(e) => update({ clientQuote: e.target.value })}
            placeholder="запишіть дослівно, як людина сформулювала свою ціль"
            className="w-full rounded-lg border border-line px-3 py-2.5 text-[15px] outline-none focus:border-black/50"
          />
        </Group>

        <div className="grid grid-cols-[auto_1fr] items-end gap-6">
          <Group label="Графік">
            <div className="flex gap-1.5">
              <Chip
                active={session.schedule === 'stable'}
                onClick={() => update({ schedule: 'stable' })}
              >
                Стабільний
              </Chip>
              <Chip
                active={session.schedule === 'flexible'}
                onClick={() => update({ schedule: 'flexible' })}
              >
                Плаваючий
              </Chip>
            </div>
          </Group>

          <div className="pb-1">
            <button
              type="button"
              onClick={() => setNotesOpen((v) => !v)}
              className="text-[12px] text-grey underline underline-offset-4 hover:text-black"
            >
              {notesOpen ? 'Сховати нотатки' : 'Нотатки'}
            </button>
          </div>
        </div>

        {notesOpen && (
          <textarea
            value={session.notes ?? ''}
            onChange={(e) => update({ notes: e.target.value })}
            rows={2}
            placeholder="вільні нотатки — у PDF не потрапляють"
            className="w-full resize-none rounded-lg border border-line px-3 py-2 text-[13px] outline-none focus:border-black/50"
          />
        )}
      </div>
    </div>
  );
}

function Group({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-[12px] text-grey">
        {label}
        {hint && <span className="text-grey/50"> · {hint}</span>}
      </div>
      {children}
    </div>
  );
}
