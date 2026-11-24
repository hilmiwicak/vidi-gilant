import { FlowerRedGold } from '../components/Art';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Ornament, OrnamentBox, Screen } from '../components/Screen';

// Copied from the approved "Last-Stop congratulation - Stage 2" frame.
const wording = `I would like to extend my deepest gratitude to you. You have been my sunshine for all my gloomy days. Semoga kita langgeng terus ya dan tetap melanjutkan hari-hari ulang tahun ke depannya bersama.

Makasih udah mau sabar sama aku yang dimana aku tau kadang sifat aku bikin km geleng2 kepala hehe.

Mungkin kita berdua masih banyak kekurangan dan harus terus belajar satu sama lain, jadi sabar2 ya dan terus mengenal satu sama lain.

Maaf ya kalo kadonya atau hadiahnya masih banyak kekurangan. Let's get on to next year's chapter, shall we? I love you sayang🤍. Makan yuk.`;

/** Last-Stop congratulation Stage 2, the approved "before we eat..." frame. */
export function LastStopBeforeWeEat({ onContinue }: { onContinue: () => void }) {
  return (
    <Screen
      ornaments={
        <>
          <OrnamentBox x={-44} y={590}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={-44} y={1050}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={300} y={66}>
            <FlowerRedGold />
          </OrnamentBox>
          <OrnamentBox x={120} y={-48}>
            <FlowerRedGold />
          </OrnamentBox>
          <Ornament icon="star" x={27} y={66} size={30} tone="gold" rotate={-10} />
          <Ornament icon="favorite" x={180} y={975} size={26} tone="red" rotate={8} />
        </>
      }
    >
      <div className="flex flex-1 flex-col gap-5 px-5 pb-7">
        <div className="flex flex-col gap-5 pt-[46px]">
          <h1 className="w-full font-hand text-[54px] font-bold leading-none text-accent">before we eat...</h1>
          <div className="w-full rounded-control bg-surface p-7 ring-2 ring-ink ring-inset">
            <p className="w-full whitespace-pre-line font-body text-[20px] leading-[1.35] text-ink">{wording}</p>
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
