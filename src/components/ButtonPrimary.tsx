import { Icon } from './Icon';

type ButtonPrimaryProps = {
  label: string;
  icon?: string;
  onClick?: () => void;
  /** The component is 60 px tall; the screens use 64 px. */
  height?: number;
  className?: string;
  labelClassName?: string;
};

/** The ink primary button from the approved frames: icon and label, radius 20. */
export function ButtonPrimary({
  label,
  icon,
  onClick,
  height = 60,
  className = '',
  labelClassName = '',
}: ButtonPrimaryProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ height }}
      className={`flex shrink-0 items-center justify-center gap-2.5 rounded-control bg-ink px-6 text-xl font-bold text-on-ink ${className}`}
    >
      {icon ? <Icon name={icon} size={26} /> : null}
      <span className={labelClassName}>{label}</span>
    </button>
  );
}
