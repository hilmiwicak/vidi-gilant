import { FlowerLilyWhite, FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';
import { requestPointerPermissions } from '../hunt/permissions';

/** Welcome Stage 2, the approved "Welcome - Stage 2" frame. */
export function WelcomeIntroduction({ onStart }: { onStart: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <Ornament icon="star" x={290} size={22} tone="red" rotate={12} bottom={182} />
          <Ornament icon="cake" x={210} size={30} tone="gold" rotate={8} bottom={124} />
          <Ornament icon="celebration" x={160} size={27} tone="gold" flipX bottom={179} />
          <Ornament icon="favorite" x={313} y={258} size={22} tone="gold" rotate={-8} />
          <Ornament icon="star" x={34} y={112} size={30} tone="red" rotate={-10} />
          <OrnamentBox x={-44} bottom={93}>
            <FlowerLilyWhite />
          </OrnamentBox>
          <OrnamentBox x={290} y={66}>
            <FlowerRedGold />
          </OrnamentBox>
        </>
      }
    >
      <div className="flex flex-1 flex-col gap-5 px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-5">
          <h1 className="w-full font-display text-[44px] font-extrabold leading-[1.05] text-ink">
            guess what&apos;s waiting for you...
          </h1>
          <p className="w-full text-[20px] font-medium leading-[1.35] text-ink">
            We&apos;re going on a little adventure today. I&apos;ve picked a few Stops for you. Somewhere that has a
            significant meaning for the both of us, or somewhere important. Each Stop gives you a Puzzle for the next
            one, and if a Puzzle has you stuck, ask for a Clue. Nobody&apos;s counting. I won&apos;t say much about
            where we&apos;re going. I&apos;m just here to keep you company.
          </p>
          <p className="w-full font-hand text-[38px] font-bold leading-[1.05] text-accent">Good luck, and have fun!</p>
        </div>
        <ButtonPrimary
          icon="explore"
          label="Start"
          height={64}
          labelClassName="text-[22px]"
          className="w-full"
          onClick={() => {
            requestPointerPermissions();
            onStart();
          }}
        />
      </div>
    </Screen>
  );
}
