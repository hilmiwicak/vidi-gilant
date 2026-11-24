import { FlowerRedGold } from '../components/Art';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** The ending frame, the approved "Final - Boxes total" screen. */
export function Final({ boxes }: { boxes: number }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={-44} y={66}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={310} y={736}>
            <FlowerRedGold />
          </OrnamentBox>
          <Ornament icon="star" x={316} y={150} size={32} tone="gold" rotate={12} />
          <Ornament icon="favorite" x={40} y={720} size={26} tone="red" rotate={-8} />
          <Ornament icon="cake" x={150} y={740} size={32} tone="gold" rotate={8} />
        </>
      }
    >
      <div className="flex flex-1 flex-col px-5 pb-[60px]">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 pb-[60px]">
          <p className="w-full text-center font-body text-[24px] font-semibold leading-[1.2] text-ink">
            You handed out
          </p>
          <div className="flex h-[220px] w-[220px] items-center justify-center rounded-full bg-gold text-ink">
            <span className="font-display text-[112px] font-extrabold leading-none">{boxes}</span>
          </div>
          <p className="w-full text-center font-display text-[44px] font-extrabold leading-[1.05] text-ink">
            {boxes === 1 ? 'box' : 'boxes'}
          </p>
          <p className="w-full text-center font-hand text-[44px] font-bold leading-none text-accent">
            ke orang-orang yang beruntung ketemu kamu hari ini
          </p>
          <div className="w-full rounded-control bg-surface p-7 ring-2 ring-ink ring-inset">
            <p className="w-full font-body text-[20px] leading-none text-ink">
              semoga orang-orang yang kamu berikan nasi kotak dilancarkan terus rezekinya dan dimudahkan segala
              urusannya.
            </p>
          </div>
        </div>
      </div>
    </Screen>
  );
}
