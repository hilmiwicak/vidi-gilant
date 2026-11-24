import { FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { RevealCard } from '../components/RevealCard';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** Reveal - Song, the approved "Reveal - Song" frame. */
export function RevealSong({ onContinue }: { onContinue: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={-44} y={70}>
            <FlowerRedGold />
          </OrnamentBox>
          <Ornament icon="star" x={320} y={150} size={30} tone="gold" rotate={-12} />
          <Ornament icon="favorite" x={320} y={672} size={26} tone="red" rotate={8} />
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-5 pt-[46px]">
          <h1 className="w-full font-hand text-[54px] font-bold leading-none text-accent">Something for you</h1>
          <RevealCard tone="ink" label="Tap to play the song" title="Song title (placeholder)" />
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
