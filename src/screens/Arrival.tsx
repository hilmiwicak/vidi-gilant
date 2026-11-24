import { FlowerLilyWhite, FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Icon } from '../components/Icon';
import { Ornament, Screen } from '../components/Screen';
import { shortStopName } from '../hunt/format';
import type { Stop } from '../hunt/types';

type ArrivalProps = {
  stop: Stop;
  onContinue: () => void;
};

/** Arrival, the approved "Arrival" frame. The Stop name is revealed here. */
export function Arrival({ stop, onContinue }: ArrivalProps) {
  return (
    <Screen
      ornaments={
        <>
          <Ornament icon="star" x={310} y={160} size={30} tone="gold" rotate={12} />
          <Ornament icon="celebration" x={322} y={340} size={32} tone="red" rotate={-10} />
          <Ornament icon="favorite" x={44} y={300} size={26} tone="red" rotate={-8} />
          <div className="absolute" style={{ left: -40, top: 70 }}>
            <FlowerRedGold />
          </div>
          <div className="absolute" style={{ left: 300, top: 612 }}>
            <FlowerLilyWhite />
          </div>
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-20">
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gold text-ink">
            <Icon name="check" size={128} weight={700} />
          </div>
          <h1 className="w-full text-center font-display text-[48px] font-extrabold leading-[1.05] text-ink">
            You found it!
          </h1>
          <p className="w-full text-center font-hand text-[54px] font-bold leading-none text-accent">
            {shortStopName(stop.name)}
          </p>
        </div>
        <ButtonPrimary
          icon="arrow_forward"
          label="Continue"
          height={64}
          labelClassName="text-[22px]"
          className="w-full"
          onClick={onContinue}
        />
      </div>
    </Screen>
  );
}
