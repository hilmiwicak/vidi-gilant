type IconProps = {
  /** A Material Symbols Rounded name, weight 600, hollow. See docs/DESIGN.md. */
  name: string;
  size?: number;
  /** Overrides the 600 weight from the stylesheet (the Pointer arrow uses 700). */
  weight?: number;
  rotate?: number;
  flipX?: boolean;
  className?: string;
};

export function Icon({ name, size = 24, weight, rotate, flipX, className = '' }: IconProps) {
  const transform = [flipX ? 'scaleX(-1)' : '', rotate ? `rotate(${rotate}deg)` : ''].filter(Boolean).join(' ');

  return (
    <span
      aria-hidden="true"
      className={`material-symbols-rounded shrink-0 ${className}`}
      style={{
        fontSize: size,
        width: size,
        height: size,
        transform: transform || undefined,
        fontVariationSettings: weight ? `'FILL' 0, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24` : undefined,
      }}
    >
      {name}
    </span>
  );
}
