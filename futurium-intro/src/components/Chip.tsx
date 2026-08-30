interface ChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  /** Компактний варіант для рядів A1…C2 */
  compact?: boolean;
}

export function Chip({ active, onClick, children, compact }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full border transition-colors duration-100',
        compact ? 'px-3.5 py-1.5 text-sm' : 'px-3.5 py-1.5 text-[13px]',
        active
          ? 'border-black bg-black text-white'
          : 'border-line bg-white text-black hover:border-black/40',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

interface SelectProps<T extends string> {
  value: T | '';
  onChange: (v: T) => void;
  options: Record<string, string>;
  placeholder: string;
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-[13px] text-black outline-none focus:border-black/50"
    >
      <option value="">{placeholder}</option>
      {Object.entries(options).map(([k, label]) => (
        <option key={k} value={k}>
          {label}
        </option>
      ))}
    </select>
  );
}
