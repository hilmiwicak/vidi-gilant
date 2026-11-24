import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { StatusBar } from './StatusBar';

/** One small gold or red decorative icon, placed absolutely inside the screen. */
export function Ornament({
  icon,
  x,
  y,
  size,
  tone,
  rotate,
  flipX,
}: {
  icon: string;
  x: number;
  y: number;
  size: number;
  tone: 'gold' | 'red';
  rotate?: number;
  flipX?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute ${tone === 'gold' ? 'text-gold' : 'text-accent'}`}
      style={{ left: x, top: y }}
    >
      <Icon name={icon} size={size} rotate={rotate} flipX={flipX} />
    </div>
  );
}

/**
 * One approved screen frame: the 390 px column with the drawn Status Bar, the
 * content, and the invisible Admin tap zone at the top center (x 133, y 62 —
 * see docs/DESIGN.md). `floating` sits above the content (the Mission and Puzzle
 * counters), `overlay` above that (the Clue card), and the Admin tap zone above
 * everything. `scroll` pins the column to the viewport and scrolls only the
 * content, so the counter and tap zone stay in place. The tap zone is wired up
 * in the Admin mode phase.
 */
export function Screen({
  ornaments,
  floating,
  overlay,
  scroll = false,
  children,
}: {
  ornaments?: ReactNode;
  floating?: ReactNode;
  overlay?: ReactNode;
  scroll?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex justify-center bg-ground ${scroll ? 'h-dvh' : 'min-h-dvh'}`}>
      <div className={`relative flex w-full max-w-[390px] flex-col overflow-hidden ${scroll ? 'h-full' : ''}`}>
        {ornaments}
        <StatusBar />
        <div className={`flex flex-1 flex-col ${scroll ? 'min-h-0 overflow-y-auto' : ''}`}>{children}</div>
        {floating}
        {overlay}
        <div aria-hidden="true" className="absolute left-1/2 top-[62px] h-14 w-[124px] -translate-x-1/2" />
      </div>
    </div>
  );
}
