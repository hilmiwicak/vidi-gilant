import { Icon } from './Icon';

type RevealCardProps = {
  /** Video and Song use the ink card; Voice uses the outlined surface card. */
  tone: 'ink' | 'surface';
  label: string;
  /** The Song card's title line. */
  title?: string;
};

/**
 * The single card on every Reveal screen: a gold play disc with a label. The
 * disc is a visual placeholder until real media exists, because a disabled
 * control would promise playback the Hunt cannot yet deliver.
 */
export function RevealCard({ tone, label, title }: RevealCardProps) {
  const dark = tone === 'ink';

  return (
    <div
      className={`flex h-[320px] w-full flex-col items-center justify-center rounded-control p-5 ${
        title ? 'gap-4' : 'gap-5'
      } ${dark ? 'bg-ink' : 'bg-surface ring-2 ring-ink ring-inset'}`}
    >
      <div aria-hidden="true" className="flex h-28 w-28 items-center justify-center rounded-full bg-gold text-ink">
        <Icon name="play_arrow" size={72} weight={700} />
      </div>
      <p
        className={`w-full text-center font-body text-[22px] font-bold leading-[1.2] ${
          dark ? 'text-on-ink' : 'text-ink'
        }`}
      >
        {label}
      </p>
      {title ? (
        <p
          className={`w-full text-center font-body text-[20px] font-medium leading-[1.2] ${
            dark ? 'text-on-ink' : 'text-ink'
          }`}
        >
          {title}
        </p>
      ) : null}
    </div>
  );
}
