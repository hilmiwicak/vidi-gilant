import { FlowerLilyWhite, FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Icon } from '../components/Icon';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';
import { shortStopName } from '../hunt/format';
import type { Stop } from '../hunt/types';

/** Last-Stop congratulation Stage 1, the approved "You made it!" frame. */
export function LastStopYouMadeIt({ stop, onContinue }: { stop: Stop; onContinue: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={310} y={70}>
            <FlowerLilyWhite />
          </OrnamentBox>
          <OrnamentBox x={-44} y={612}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={300} y={612}>
            <FlowerLilyWhite />
          </OrnamentBox>
          <Ornament icon="star" x={120} y={652} size={30} tone="gold" rotate={-10} />
          <Ornament icon="celebration" x={176} y={664} size={34} tone="red" rotate={-10} />
          <Ornament icon="favorite" x={262} y={650} size={26} tone="red" rotate={-8} />
          <Ornament icon="sunny" x={24} y={340} size={30} tone="gold" />
          <Ornament icon="cake" x={338} y={340} size={30} tone="gold" rotate={8} />
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-20">
          <div className="relative flex h-[272px] w-[272px] items-center justify-center">
            <div aria-hidden="true" className="absolute inset-0 rounded-full border-4 border-gold" />
            <div className="flex h-[216px] w-[216px] items-center justify-center rounded-full bg-gold text-ink">
              <Icon name="check" size={144} weight={700} />
            </div>
          </div>
          <h1 className="w-full text-center font-display text-[56px] font-extrabold leading-[1.05] text-ink">
            You made it!
          </h1>
          <p className="w-full text-center font-hand text-[64px] font-bold leading-none text-accent">
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
