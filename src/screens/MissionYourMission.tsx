import { FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Icon } from '../components/Icon';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** Mission Stage 1, the approved "Mission - Stage 1" frame. */
export function MissionYourMission({ onNext }: { onNext: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <Ornament icon="star" x={306} size={28} tone="gold" rotate={12} bottom={166} />
          <Ornament icon="sunny" x={206} size={30} tone="gold" bottom={124} />
          <Ornament icon="favorite" x={324} size={24} tone="red" rotate={-8} bottom={120} />
          <OrnamentBox x={306} y={64}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={-38} bottom={72}>
            <FlowerRedGold />
          </OrnamentBox>
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7 pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="w-full font-display text-[44px] font-extrabold leading-[1.05] text-ink">Your Mission</h1>
            <p className="w-full font-hand text-[40px] font-bold leading-none text-accent">10 boxes in the car</p>
          </div>
          <div className="relative w-full overflow-hidden rounded-control">
            <img src="/mission/nasi-box.jpg" alt="" className="h-[280px] w-full object-cover" />
            <div className="absolute bottom-3 right-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink">
              <Icon name="takeout_dining" size={30} />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="w-full font-body text-[20px] font-medium leading-[1.35] text-ink">We&apos;re going for</p>
            <p className="w-full font-hand text-[44px] font-bold leading-none text-accent">Jumat Berkah</p>
            <p className="w-full font-body text-[20px] font-medium leading-[1.35] text-ink">
              You&apos;ve wanted to do this for a while, haven&apos;t you?
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
