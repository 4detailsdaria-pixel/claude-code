import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ConsultationSession, Derived } from './types';
import { derive } from './lib/calc';
import { saveSession } from './lib/storage';

interface Ctx {
  session: ConsultationSession;
  derived: Derived;
  update: (patch: Partial<ConsultationSession>) => void;
  /** Текст поля з урахуванням правок на льоту */
  text: (id: string, fallback: string) => string;
  /** Записати правку, зроблену в презентаційному режимі */
  setText: (id: string, value: string) => void;
  presenting: boolean;
}

const SessionContext = createContext<Ctx | null>(null);

export function useSession(): Ctx {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession має викликатись усередині SessionProvider');
  return ctx;
}

export function SessionProvider({
  initial,
  presenting,
  children,
  onChange,
}: {
  initial: ConsultationSession;
  presenting: boolean;
  children: React.ReactNode;
  onChange?: (s: ConsultationSession) => void;
}) {
  const [session, setSession] = useState(initial);

  // Автозбереження в localStorage при кожній зміні — дзвінок не має
  // залежати від того, чи ведуча щось натиснула.
  useEffect(() => {
    saveSession(session);
    onChange?.(session);
    // onChange навмисно не в залежностях: він міняється щорендеру в батька
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const update = useCallback((patch: Partial<ConsultationSession>) => {
    setSession((prev) => ({ ...prev, ...patch }));
  }, []);

  const setText = useCallback((id: string, value: string) => {
    setSession((prev) => ({ ...prev, edits: { ...prev.edits, [id]: value } }));
  }, []);

  const text = useCallback(
    (id: string, fallback: string) => session.edits[id] ?? fallback,
    [session.edits],
  );

  const derived = useMemo(() => derive(session), [session]);

  const value = useMemo(
    () => ({ session, derived, update, text, setText, presenting }),
    [session, derived, update, text, setText, presenting],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
