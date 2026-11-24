import { FlowerLilyWhite, FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Icon } from '../components/Icon';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

/** Last-Stop congratulation Stage 3, the approved "Once again..." frame. */
export function LastStopOnceAgain({ onContinue }: { onContinue: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={-60} y={66}>
            <FlowerLilyWhite />
          </OrnamentBox>
          <OrnamentBox x={310} y={600}>
            <FlowerRedGold />
          </OrnamentBox>
          <Ornament icon="star" x={310} y={160} size={32} tone="gold" rotate={12} />
          <Ornament icon="favorite" x={44} y={610} size={26} tone="red" rotate={-8} />
          <Ornament icon="sunny" x={150} y={660} size={30} tone="gold" />
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-20">
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gold text-ink">
            <Icon name="cake" size={112} weight={700} />
          </div>
          <h1 className="w-full whitespace-pre-line text-center font-display text-[48px] font-extrabold leading-[1.05] text-ink">
            {'Once again,\nhappy birthday, Vidiana'}
          </h1>
          <p className="w-full text-center font-hand text-[40px] font-bold leading-none text-accent">
            makasih ya udah nemenin aku selama hampir dua tahun ini.
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
