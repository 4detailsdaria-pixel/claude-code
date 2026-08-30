import type { ConsultationSession } from '../types';

function newId(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function createSession(
  partial: Partial<ConsultationSession> = {},
): ConsultationSession {
  const now = new Date().toISOString();
  return {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    clientName: '',
    telegram: '',
    statedGoal: '',
    source: undefined,
    currentLevel: 'A2',
    targetLevel: 'B2',
    field: '',
    goal: '',
    gaps: [],
    blockers: [],
    clientQuote: '',
    schedule: 'stable',
    experience: '',
    notes: '',
    recommendedFormat: '',
    formatOverridden: false,
    frequency: 2,
    formatReason: '',
    edits: {},
    ...partial,
  };
}

/** Демо-сесія для наскрізного проходу без введення даних. */
export function demoSession(): ConsultationSession {
  return createSession({
    clientName: 'Олена',
    telegram: '@olena',
    statedGoal: 'Хочу вільно говорити з командою',
    source: 'instagram',
    currentLevel: 'B1',
    targetLevel: 'B2',
    field: 'it',
    goal: 'career',
    gaps: ['meetings', 'foreign-clients'],
    blockers: ['understand-cant-speak', 'afraid-mistakes'],
    clientQuote: 'Щоб спікати на ізі без бар’єру з іноземними колегами',
    schedule: 'flexible',
    experience: 'courses-long-ago',
  });
}
