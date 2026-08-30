import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { Editable } from '../components/Editable';
import { gapSkills, goalSkills } from '../config/goals';

/** Навички, що розшифровують мету клієнта. Пріоритет — у «де бракує». */
export function deriveSkills(
  goal: string,
  gaps: string[],
): string[] {
  const fromGaps = gaps.map((g) => gapSkills[g as keyof typeof gapSkills]).filter(Boolean);
  if (fromGaps.length >= 2) return fromGaps.slice(0, 4);
  const fromGoal = goal ? (goalSkills[goal as keyof typeof goalSkills] ?? []) : [];
  return [...fromGaps, ...fromGoal].slice(0, 4);
}

/** Екран 3 · Ваша ціль (презентаційний). */
export function Screen3Goal() {
  const { session, text, setText } = useSession();
  const skills = deriveSkills(session.goal, session.gaps);

  return (
    <Stage eyebrow="Ваша ціль">
      <blockquote className="max-w-[900px]">
        <Editable
          as="p"
          id="s3.quote"
          value={text('s3.quote', session.clientQuote || 'Цитата клієнта')}
          onChange={setText}
          placeholder="цитата клієнта"
          className="brand-title text-[40px] leading-[1.22] normal-case tracking-[0.01em]"
        />
      </blockquote>

      <p className="mt-12 text-[15px] text-grey">Це означає конкретно:</p>

      <ul className="mt-6 space-y-5">
        {skills.length === 0 && (
          <li className="text-[20px] text-grey/60">
            оберіть мету й «де бракує» на екрані розмови
          </li>
        )}
        {skills.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-[0.75em] block h-[2px] w-6 shrink-0 bg-black" />
            <Editable
              as="span"
              id={`s3.skill.${i}`}
              value={text(`s3.skill.${i}`, s)}
              onChange={setText}
              className="text-[24px] leading-snug"
            />
          </li>
        ))}
      </ul>
    </Stage>
  );
}
