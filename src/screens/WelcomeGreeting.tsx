import { FlowerLilyWhite, FlowerRedGold, FlowerSprigRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** Welcome Stage 1, the approved "Welcome - Stage 1" frame. */
export function WelcomeGreeting({ onNext }: { onNext: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <Ornament icon="star" x={214} size={22} tone="gold" rotate={14} bottom={122} />
          <Ornament icon="sunny" x={138} size={30} tone="gold" bottom={162} />
          <Ornament icon="celebration" x={296} size={36} tone="red" bottom={168} />
          <Ornament icon="favorite" x={200} y={150} size={24} tone="red" rotate={10} />
          <Ornament icon="star" x={34} y={132} size={32} tone="gold" rotate={-12} />
          <OrnamentBox x={-38} bottom={114}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={288} y={64}>
            <FlowerLilyWhite />
          </OrnamentBox>
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex w-full justify-center">
            <FlowerSprigRedGold />
          </div>
          <div className="flex w-full flex-col items-center">
            <h1 className="w-full text-center font-display text-[44px] font-extrabold leading-[1.05] text-ink">
              Happy birthday,
            </h1>
            <p className="w-full text-center font-hand text-[52px] font-bold leading-none text-accent">
              Vidiana Tryartha Ramadhani
            </p>
          </div>
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
