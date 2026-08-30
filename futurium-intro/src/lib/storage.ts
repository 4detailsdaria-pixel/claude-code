import type { ConsultationSession } from '../types';

const KEY = 'futurium.sessions.v1';
const CURRENT_KEY = 'futurium.current.v1';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadAll(): ConsultationSession[] {
  try {
    const list = safeParse<ConsultationSession[]>(localStorage.getItem(KEY), []);
    return Array.isArray(list) ? list : [];
  } catch {
    // localStorage може бути недоступний (приватне вікно, заблоковані куки)
    return [];
  }
}

export function saveSession(session: ConsultationSession): void {
  try {
    const all = loadAll();
    const idx = all.findIndex((s) => s.id === session.id);
    const next = { ...session, updatedAt: new Date().toISOString() };
    if (idx >= 0) all[idx] = next;
    else all.unshift(next);
    localStorage.setItem(KEY, JSON.stringify(all));
    localStorage.setItem(CURRENT_KEY, session.id);
  } catch {
    /* тиша: втрата чернетки не має ламати дзвінок */
  }
}

export function deleteSession(id: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(loadAll().filter((s) => s.id !== id)));
  } catch {
    /* no-op */
  }
}

export function loadCurrentId(): string | null {
  try {
    return localStorage.getItem(CURRENT_KEY);
  } catch {
    return null;
  }
}

/** Експорт усіх сесій у JSON — на випадок міграції на бекенд або в CRM. */
export function exportAllAsJson(): void {
  const blob = new Blob([JSON.stringify(loadAll(), null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `futurium-sessions-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
