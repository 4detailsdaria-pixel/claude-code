import logoFull from '../assets/logo/futurium-full-black.png';
import logoMark from '../assets/logo/futurium-mark-black.png';

export { logoFull, logoMark };

export function Logo({
  variant = 'mark',
  height = 28,
  className = '',
}: {
  variant?: 'mark' | 'full';
  height?: number;
  className?: string;
}) {
  return (
    <img
      src={variant === 'full' ? logoFull : logoMark}
      alt="Futurium"
      style={{ height }}
      className={className}
    />
  );
}
