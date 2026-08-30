import { useEffect, useRef } from 'react';

interface Props {
  /** Стабільний ключ поля — під ним правка лягає в session.edits */
  id: string;
  /** Текст за замовчуванням, згенерований із конфігів */
  value: string;
  onChange: (id: string, value: string) => void;
  className?: string;
  placeholder?: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'li';
  /** У приватному режимі правка на льоту не потрібна */
  enabled?: boolean;
}

/**
 * Текст, редагований по кліку прямо під час показу клієнту.
 * Візуально це НЕ інпут: без рамок, підсвітка лише при наведенні/фокусі.
 *
 * contentEditable тримаємо неконтрольованим — React не має перезаписувати
 * DOM під курсором. Значення синхронізуємо лише коли воно змінилось ззовні.
 */
export function Editable({
  id,
  value,
  onChange,
  className = '',
  placeholder,
  as: Tag = 'div',
  enabled = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Не чіпаємо DOM, поки поле у фокусі — інакше з'їде каретка.
    if (document.activeElement === el) return;
    if (el.textContent !== value) el.textContent = value;
    lastValue.current = value;
  }, [value]);

  if (!enabled) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as never}
      data-editable=""
      data-placeholder={placeholder}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={className}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = e.currentTarget.textContent ?? '';
        if (next !== lastValue.current) {
          lastValue.current = next;
          onChange(id, next);
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
        if (e.key === 'Escape') {
          e.currentTarget.textContent = lastValue.current;
          (e.currentTarget as HTMLElement).blur();
        }
        // Стрілки гортають екрани — усередині поля вони мають лишатись стрілками
        e.stopPropagation();
      }}
    />
  );
}
