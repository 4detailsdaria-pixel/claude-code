/** Галочка як вектор: у брендовому шрифті гліфа ✓ немає. */
export function Check({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 12.5 L9.5 18 L20 6.5"
        stroke="var(--futurium-yellow)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
