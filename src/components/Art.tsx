import flowerRedGoldUrl from '../assets/flower-red-gold.svg';
import flowerLilyWhiteUrl from '../assets/flower-lily-white.svg';
import flowerSprigRedGoldUrl from '../assets/flower-sprig-red-gold.svg';

type FlowerProps = {
  size?: number;
  className?: string;
};

/**
 * The approved flower artwork, extracted from design/vidi-gilant.pen. The
 * colors are baked into the SVG paths, so the accent and gold tokens do not
 * recolor them — see docs/DESIGN.md.
 */

/**
 * Tailwind's preflight sets `max-width: 100%` on images, which shrinks a flower
 * inside a shrink-to-fit absolute wrapper near the right edge. Keep the design
 * size regardless of the wrapper's available width.
 */
function Flower({ src, size, className }: FlowerProps & { src: string }) {
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      style={{ width: size, height: size }}
      className={`max-w-none ${className}`}
    />
  );
}

export function FlowerRedGold({ size = 132, className = '' }: FlowerProps) {
  return <Flower src={flowerRedGoldUrl} size={size} className={className} />;
}

export function FlowerLilyWhite({ size = 161, className = '' }: FlowerProps) {
  return <Flower src={flowerLilyWhiteUrl} size={size} className={className} />;
}

export function FlowerSprigRedGold({ size = 240, className = '' }: FlowerProps) {
  return <Flower src={flowerSprigRedGoldUrl} size={size} className={className} />;
}
