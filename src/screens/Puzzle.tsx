import { useState } from 'react';
import { FlowerRedGold } from '../components/Art';
import { BoxesCounter } from '../components/BoxesCounter';
import { ButtonOutline } from '../components/ButtonOutline';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Icon } from '../components/Icon';
import { Ornament, Screen } from '../components/Screen';
import { TextLink } from '../components/TextLink';
import type { Stop } from '../hunt/types';

type PuzzleProps = {
  stop: Stop;
  /** Plan B hides the counter and leaves the top empty. */
  showCounter: boolean;
  boxes: number;
  onSubtract: () => void;
  onAdd: () => void;
};

// Phase 4 replaces these with the live distance and bearing.
const PLACEHOLDER_DISTANCE = '450 m';
const PLACEHOLDER_BEARING = 28;

/** The Puzzle screen, the approved "Puzzle - Puzzle" frame. */
export function Puzzle({ stop, showCounter, boxes, onSubtract, onAdd }: PuzzleProps) {
  const [clueOpen, setClueOpen] = useState(false);

  return (
    <Screen
      scroll
      floating={
        showCounter ? (
          <div className="absolute left-[67px] top-[58px]">
            <BoxesCounter count={boxes} onSubtract={onSubtract} onAdd={onAdd} />
          </div>
        ) : undefined
      }
      overlay={clueOpen ? <Clue clue={stop.puzzle.clue} onClose={() => setClueOpen(false)} /> : undefined}
      ornaments={
        <>
          <Ornament icon="celebration" x={332} y={366} size={30} tone="red" rotate={-10} />
          <Ornament icon="star" x={22} y={372} size={28} tone="gold" rotate={12} />
          <div className="absolute" style={{ left: 304, top: 440 }}>
            <FlowerRedGold />
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-4 px-5 pb-5 pt-[76px]">
        <div className="flex flex-col">
          <h1 className="w-full font-display text-[34px] font-extrabold leading-[1.1] text-ink">{stop.puzzle.lead}</h1>
          <p className="w-full font-hand text-[54px] font-extrabold leading-none text-accent">{stop.puzzle.phrase}</p>
        </div>
        <ButtonPrimary icon="lightbulb" label="Need a Clue?" className="w-full" onClick={() => setClueOpen(true)} />
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative h-[236px] w-[236px] rounded-full bg-gold">
            <div className="absolute left-[110.5px] top-[20.5px]">
              <Icon name="navigation" size={128} weight={700} rotate={PLACEHOLDER_BEARING} />
            </div>
          </div>
          <p className="font-display text-[64px] font-extrabold leading-[1.2] text-ink">{PLACEHOLDER_DISTANCE}</p>
        </div>
        <ButtonOutline icon="refresh" label="Refresh location" className="w-full" />
        <TextLink label="Having trouble" sub="at the location?" />
      </div>
    </Screen>
  );
}

/** The Clue card over a dimmed screen; the whole overlay dismisses on tap. */
function Clue({ clue, onClose }: { clue: string; onClose: () => void }) {
  return (
    <div role="presentation" className="absolute inset-0 overflow-y-auto bg-ink/65" onClick={onClose}>
      <div className="flex min-h-full flex-col px-5 pb-5 pt-[330px]">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clue-heading"
          className="flex flex-col gap-5 rounded-control bg-surface p-6 pt-7 ring-2 ring-ink ring-inset"
          onClick={(event) => event.stopPropagation()}
        >
          <h2 id="clue-heading" className="font-hand text-[48px] font-extrabold leading-tight text-accent">
            Clue
          </h2>
          <p className="font-body text-[24px] font-semibold leading-[1.3] text-ink">{clue}</p>
          <ButtonPrimary icon="check" label="Got it" className="w-full" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
