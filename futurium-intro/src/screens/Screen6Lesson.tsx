import { useSession } from '../state';
import { Stage } from '../components/Shell';
import { Editable } from '../components/Editable';
import { lessonStages, lessonImage, personalizationTemplate } from '../config/lesson-structure';
import { fieldLabels } from '../config/dictionaries';

/** Екран 6 · Як виглядає урок (презентаційний). */
export function Screen6Lesson() {
  const { session, text, setText } = useSession();

  const fieldLabel = session.field ? fieldLabels[session.field] : '';
  const personalization = fieldLabel
    ? personalizationTemplate.replace('{field}', fieldLabel)
    : personalizationTemplate.replace('{field}', 'ваша сфера');

  return (
    <Stage eyebrow="Як виглядає урок">
      <h2 className="brand-title mb-3 text-[34px]">Структура заняття</h2>
      <Editable
        as="p"
        id="s6.personalization"
        value={text('s6.personalization', personalization)}
        onChange={setText}
        className="mb-12 inline-block text-[18px] text-black/70"
      />

      <ol className="grid grid-cols-5 gap-4">
        {lessonStages.map((stage, i) => (
          <li key={stage.title} className="flex flex-col">
            <div
              className="mb-4 h-[3px] w-full rounded-full"
              style={{
                background:
                  i % 2 === 0 ? 'var(--futurium-yellow)' : 'var(--futurium-periwinkle)',
              }}
            />
            <div className="brand-eyebrow mb-2 text-[11px] text-grey/60">
              {stage.minutes ? `${stage.minutes} хв` : `крок ${i + 1}`}
            </div>
            <div className="mb-2 text-[19px] leading-tight">{stage.title}</div>
            <Editable
              as="p"
              id={`s6.stage.${i}`}
              value={text(`s6.stage.${i}`, stage.description)}
              onChange={setText}
              className="text-[14px] leading-snug text-grey"
            />
          </li>
        ))}
      </ol>

      {/* Слот під скріншот реального уроку — файл підставить школа
          (src/config/lesson-structure.ts → lessonImage) */}
      {lessonImage && (
        <img
          src={lessonImage}
          alt="Фрагмент уроку"
          className="mt-12 w-full rounded-2xl border border-line object-cover"
          style={{ maxHeight: 280 }}
        />
      )}
    </Stage>
  );
}
