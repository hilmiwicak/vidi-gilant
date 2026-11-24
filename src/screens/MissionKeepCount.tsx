import { FlowerRedGold } from '../components/Art';
import { BoxesCounter } from '../components/BoxesCounter';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

type MissionKeepCountProps = {
  boxes: number;
  onSubtract: () => void;
  onAdd: () => void;
  onNext: () => void;
};

/** Mission Stage 2, the approved "Mission - Stage 2" frame. */
export function MissionKeepCount({ boxes, onSubtract, onAdd, onNext }: MissionKeepCountProps) {
  return (
    <Screen
      ornaments={
        <>
          <Ornament icon="star" x={304} size={28} tone="gold" rotate={12} bottom={196} />
          <Ornament icon="sunny" x={200} size={30} tone="gold" bottom={146} />
          <Ornament icon="favorite" x={318} size={24} tone="red" rotate={-8} bottom={130} />
          <OrnamentBox x={306} y={64}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={-38} bottom={94}>
            <FlowerRedGold />
          </OrnamentBox>
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-7">
          <div className="flex flex-col">
            <h1 className="w-full font-display text-[44px] font-extrabold leading-[1.05] text-ink">Keep a count</h1>
            <p className="w-full font-hand text-[40px] font-bold leading-none text-accent">one box at a time</p>
          </div>
          {/* The red rings are a static demo of the counter; they blink in Polish. */}
          <div className="relative h-[150px] w-full">
            <div className="absolute left-[47px] top-[30px]">
              <BoxesCounter count={boxes} onSubtract={onSubtract} onAdd={onAdd} />
            </div>
            <div className="absolute left-[235px] top-[26px] h-[72px] w-[72px] rounded-full border-4 border-accent" />
            <div className="absolute left-[231px] top-[22px] h-20 w-20 rounded-full border-[3px] border-accent opacity-40" />
            <div className="absolute left-[43px] top-[26px] h-[72px] w-[72px] rounded-full border-4 border-accent" />
            <div className="absolute left-[39px] top-[22px] h-20 w-20 rounded-full border-[3px] border-accent opacity-40" />
            <span className="absolute left-[29px] top-[110px] w-[100px] text-center font-hand text-[30px] font-bold leading-none text-accent">
              remove
            </span>
            <span className="absolute left-[221px] top-[110px] w-[100px] text-center font-hand text-[30px] font-bold leading-none text-accent">
              add
            </span>
          </div>
          <p className="w-full font-body text-[20px] font-medium leading-[1.35] text-ink">
            Hit + or − to add or remove a box as you go.
          </p>
        </div>
        <ButtonPrimary
          icon="arrow_forward"
          label="Next"
          height={64}
          labelClassName="text-[22px]"
          className="w-full"
          onClick={onNext}
        />
      </div>
    </Screen>
  );
}
