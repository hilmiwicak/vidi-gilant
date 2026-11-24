import { FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { RevealCard } from '../components/RevealCard';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** Reveal - Voice, the approved "Reveal - Voice" frame. */
export function RevealVoice({ onContinue }: { onContinue: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={296} y={64}>
            <FlowerRedGold />
          </OrnamentBox>
          <Ornament icon="sunny" x={40} y={672} size={32} tone="gold" />
          <Ornament icon="star" x={320} y={676} size={26} tone="red" rotate={12} />
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-5 pt-[46px]">
          <h1 className="w-full font-hand text-[54px] font-bold leading-none text-accent">Something for you</h1>
          <RevealCard tone="surface" label="Tap to play the voice message" />
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
