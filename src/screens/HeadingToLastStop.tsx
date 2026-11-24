import { FlowerLilyWhite, FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Icon } from '../components/Icon';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** The "Heading to the last Stop" frame, shown before the dinner's Puzzle. */
export function HeadingToLastStop({ onContinue }: { onContinue: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={290} y={66}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={-44} y={590}>
            <FlowerLilyWhite />
          </OrnamentBox>
          <Ornament icon="star" x={306} y={632} size={28} tone="gold" rotate={12} />
          <Ornament icon="sunny" x={200} y={676} size={30} tone="gold" />
          <Ornament icon="favorite" x={318} y={696} size={24} tone="red" rotate={-8} />
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-5 pt-[46px]">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gold text-ink">
            <Icon name="flag" size={64} weight={700} />
          </div>
          <h1 className="w-full font-display text-[44px] font-extrabold leading-[1.05] text-ink">One Stop to go</h1>
          <p className="w-full font-body text-[20px] font-medium leading-[1.35] text-ink">
            The next one is the last. Kira-kira bakal kemana hayoo?
          </p>
          <p className="w-full font-hand text-[44px] font-bold leading-none text-accent">Ready for one more?</p>
        </div>
        <ButtonPrimary
          icon="arrow_forward"
          label="See the last Puzzle"
          height={64}
          labelClassName="text-[22px]"
          className="w-full"
          onClick={onContinue}
        />
      </div>
    </Screen>
  );
}
