import { FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ornament, Screen } from '../components/Screen';

type RevealTextProps = {
  body: string;
  onContinue: () => void;
};

/** Reveal - Text, the approved "Reveal - Text" frame. */
export function RevealText({ body, onContinue }: RevealTextProps) {
  return (
    <Screen
      ornaments={
        <>
          <Ornament icon="star" x={310} y={110} size={30} tone="gold" rotate={-10} />
          <Ornament icon="favorite" x={300} y={600} size={26} tone="red" rotate={8} />
          <div className="absolute" style={{ left: -44, top: 590 }}>
            <FlowerRedGold />
          </div>
        </>
      }
    >
      <div className="flex flex-1 flex-col justify-between px-5 pb-7">
        <div className="flex flex-1 flex-col justify-center gap-5 pt-[46px]">
          <h1 className="w-full font-hand text-[54px] font-bold leading-none text-accent">Something for you</h1>
          <div className="w-full rounded-control bg-surface p-7 ring-2 ring-ink ring-inset">
            <p className="w-full font-body text-[24px] font-semibold leading-[1.35] text-ink">{body}</p>
          </div>
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
