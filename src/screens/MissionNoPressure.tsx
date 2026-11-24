import { FlowerRedGold } from '../components/Art';
import { BoxesCounter } from '../components/BoxesCounter';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ornament, Screen } from '../components/Screen';

type MissionNoPressureProps = {
  boxes: number;
  onSubtract: () => void;
  onAdd: () => void;
  onNext: () => void;
};

/** Mission Stage 3, the approved "Mission - Stage 3" frame. */
export function MissionNoPressure({ boxes, onSubtract, onAdd, onNext }: MissionNoPressureProps) {
  return (
    <Screen
      floating={
        <div className="absolute left-[67px] top-[58px]">
          <BoxesCounter count={boxes} onSubtract={onSubtract} onAdd={onAdd} />
        </div>
      }
      ornaments={
        <>
          <Ornament icon="star" x={304} y={620} size={28} tone="gold" rotate={12} />
          <Ornament icon="sunny" x={200} y={668} size={30} tone="gold" />
          <Ornament icon="favorite" x={318} y={690} size={24} tone="red" rotate={-8} />
          <div className="absolute" style={{ left: -38, top: 618 }}>
            <FlowerRedGold />
          </div>
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-5 pt-[46px]">
          <h1 className="w-full font-display text-[44px] font-extrabold leading-[1.05] text-ink">No pressure</h1>
          <p className="w-full font-body text-[20px] font-medium leading-[1.35] text-ink">
            The counter is only for you. It never changes the Hunt.
          </p>
          <p className="w-full font-hand text-[44px] font-bold leading-none text-accent">Ready for Puzzle 1?</p>
        </div>
        <ButtonPrimary
          icon="arrow_forward"
          label="See Puzzle 1"
          height={64}
          labelClassName="text-[22px]"
          className="w-full"
          onClick={onNext}
        />
      </div>
    </Screen>
  );
}
