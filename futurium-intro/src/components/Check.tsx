/**
 * Галочка як вектор: гліфа ✓ (U+2713) у брендовому шрифті немає,
 * текстом його набирати не можна — буде порожній прямокутник.
 *
 * `chip` — жовта плашка з чорною галочкою всередині. Жовтий по білому
 * сам по собі надто світлий, щоб нести акцент; плашка дає контраст,
 * не додаючи в макет нового кольору.
 */
export function Check({ size = 26, chip = false }: { size?: number; chip?: boolean }) {
  const tick = (
    <svg
      width={chip ? size * 0.58 : size}
      height={chip ? size * 0.58 : size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12.5 L9.5 18 L20 6.5"
        stroke={chip ? 'var(--futurium-black)' : 'var(--futurium-yellow)'}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!chip) return <span className="shrink-0">{tick}</span>;

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[9px]"
      style={{ width: size, height: size, background: 'var(--futurium-yellow)' }}
    >
      {tick}
    </span>
  );
}
