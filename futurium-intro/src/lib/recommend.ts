import type { ConsultationSession, FormatType, Frequency } from '../types';
import { rules, fallbackRule, type RuleCondition } from '../config/formats';

function matches(cond: RuleCondition, s: ConsultationSession): boolean {
  if (cond.schedule && cond.schedule !== s.schedule) return false;
  if (cond.goal && cond.goal !== s.goal) return false;
  if (cond.currentLevel && !cond.currentLevel.includes(s.currentLevel)) return false;
  // Порожня умова не може матчити все — це помилка в конфізі, а не правило.
  return Object.keys(cond).length > 0;
}

export interface Recommendation {
  format: FormatType;
  reason: string;
  frequency: Frequency;
}

/** Перше підхоже правило згори вниз; інакше — запасний варіант. */
export function recommendFormat(s: ConsultationSession): Recommendation {
  for (const rule of rules) {
    if (matches(rule.if, s)) {
      return {
        format: rule.recommend,
        reason: rule.reason,
        frequency: rule.frequency ?? 2,
      };
    }
  }
  return {
    format: fallbackRule.recommend,
    reason: fallbackRule.reason,
    frequency: fallbackRule.frequency ?? 2,
  };
}
