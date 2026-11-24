type IconProps = {
  /** A Material Symbols Rounded name, weight 600, hollow. See docs/DESIGN.md. */
  name: string;
  size?: number;
  rotate?: number;
  flipX?: boolean;
  className?: string;
};

export function Icon({ name, size = 24, rotate, flipX, className = '' }: IconProps) {
  const transform = [flipX ? 'scaleX(-1)' : '', rotate ? `rotate(${rotate}deg)` : ''].filter(Boolean).join(' ');

  return (
    <span
      aria-hidden="true"
      className={`material-symbols-rounded shrink-0 ${className}`}
      style={{ fontSize: size, width: size, height: size, transform: transform || undefined }}
    >
      {name}
    </span>
  );
}
