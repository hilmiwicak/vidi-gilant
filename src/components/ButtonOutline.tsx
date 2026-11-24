import { Icon } from './Icon';

type ButtonOutlineProps = {
  label: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  labelClassName?: string;
};

/** The outlined button from the approved frames, 56 px tall with a 2 px inset stroke. */
export function ButtonOutline({ label, icon, onClick, className = '', labelClassName = '' }: ButtonOutlineProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-control bg-surface px-6 text-ink ring-2 ring-ink ring-inset ${className}`}
    >
      {icon ? <Icon name={icon} size={24} /> : null}
      <span className={`text-[18px] font-semibold ${labelClassName}`}>{label}</span>
    </button>
  );
}
