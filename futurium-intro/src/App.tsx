import { useCallback, useEffect, useState } from 'react';
import type { ConsultationSession } from './types';
import { SessionProvider } from './state';
import { createSession, demoSession } from './lib/session';
import { loadAll } from './lib/storage';
import { Nav } from './components/Nav';
import { Screen0Prep } from './screens/Screen0Prep';
import { Screen1Talk } from './screens/Screen1Talk';
import { Handoff } from './screens/Handoff';
import { Screen2Level } from './screens/Screen2Level';
import { Screen3Goal } from './screens/Screen3Goal';
import { Screen4Duration } from './screens/Screen4Duration';
import { Screen5Format } from './screens/Screen5Format';
import { Screen6Lesson } from './screens/Screen6Lesson';
import { Screen7Benefits } from './screens/Screen7Benefits';
import { Screen8Price } from './screens/Screen8Price';
import { Screen9Next } from './screens/Screen9Next';

// Крок 0 — розмова, 1 — перехід, далі презентаційні екрани.
// Екран 0 (підготовка) живе поза цим переліком: він до дзвінка.
const HandoffSlot = () => null; // рендериться окремо, з пропсами
const FLOW = [
  Screen1Talk,
  HandoffSlot,
  Screen2Level,
  Screen3Goal,
  Screen4Duration,
  Screen5Format,
  Screen6Lesson,
  Screen7Benefits,
  Screen8Price,
  Screen9Next,
] as const;

const HANDOFF_STEP = 1;
const FIRST_PRESENTATION_STEP = 2;

export default function App() {
  const [saved, setSaved] = useState<ConsultationSession[]>(() => loadAll());
  const [session, setSession] = useState<ConsultationSession | null>(null);
  const [step, setStep] = useState(0);
  const [presenting, setPresenting] = useState(false);

  const refresh = useCallback(() => setSaved(loadAll()), []);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(FLOW.length - 1, next));
      setStep(clamped);
      // Презентаційний режим вмикається лише через екран переходу,
      // але при поверненні назад має коректно вимкнутись.
      if (clamped < FIRST_PRESENTATION_STEP) setPresenting(false);
    },
    [],
  );

  // Гортання стрілками — під час показу клієнту руки на клавіатурі.
  useEffect(() => {
    if (!session) return;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(el.tagName))) return;
      if (e.key === 'ArrowRight') go(step + 1);
      if (e.key === 'ArrowLeft') go(step - 1);
      if (e.key === 'Escape' && presenting) setPresenting(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [session, step, go, presenting]);

  if (!session) {
    return (
      <Screen0Prep
        saved={saved}
        onRefresh={refresh}
        onStart={(draft) => {
          setSession(createSession(draft));
          setStep(0);
          setPresenting(false);
        }}
        onOpen={(s) => {
          setSession(s);
          setStep(0);
          setPresenting(false);
        }}
        onDemo={() => {
          setSession(demoSession());
          setStep(0);
          setPresenting(false);
        }}
      />
    );
  }

  const Current = FLOW[step];

  return (
    <SessionProvider initial={session} presenting={presenting} onChange={refresh}>
      <div className="flex h-full flex-col">
        {!presenting && (
          <Nav
            step={step}
            total={FLOW.length}
            presenting={false}
            clientName={session.clientName}
            onPrev={() => go(step - 1)}
            onNext={() => go(step + 1)}
            onExit={() => setSession(null)}
          />
        )}

        <main className="min-h-0 flex-1">
          {step === HANDOFF_STEP ? (
            <Handoff
              onStart={() => {
                setPresenting(true);
                setStep(FIRST_PRESENTATION_STEP);
              }}
            />
          ) : (
            <Current />
          )}
        </main>

        {presenting && (
          <Nav
            step={step}
            total={FLOW.length}
            presenting
            clientName={session.clientName}
            onPrev={() => go(step - 1)}
            onNext={() => go(step + 1)}
            onExit={() => setPresenting(false)}
          />
        )}
      </div>
    </SessionProvider>
  );
}
