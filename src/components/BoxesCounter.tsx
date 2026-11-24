import { Icon } from './Icon';

type BoxesCounterProps = {
  count: number;
  onSubtract: () => void;
  onAdd: () => void;
};

/**
 * The Mission counter pill from the approved frames: minus and plus, one box at
 * a time. It never gates progression and has no target — see docs/HUNT.md.
 */
export function BoxesCounter({ count, onSubtract, onAdd }: BoxesCounterProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-pill bg-surface p-1 ring-2 ring-ink ring-inset">
      <button
        type="button"
        onClick={onSubtract}
        aria-label="One box less"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-on-ink"
      >
        <Icon name="remove" size={28} />
      </button>
      <div className="flex w-[124px] items-center justify-center gap-2">
        <Icon name="takeout_dining" size={24} />
        <span className="text-xl font-bold">
          {count} {count === 1 ? 'box' : 'boxes'}
        </span>
      </div>
      <button
        type="button"
        onClick={onAdd}
        aria-label="One box more"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-on-ink"
      >
        <Icon name="add" size={28} />
      </button>
    </div>
  );
}
