type TextLinkProps = {
  label: string;
  /** The italic line under the label, e.g. "at the location?". */
  sub?: string;
  onClick?: () => void;
};

/** The "Having trouble" link from the approved frames: a label and an italic sub-line. */
export function TextLink({ label, sub, onClick }: TextLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-center justify-center gap-0.5 py-2 text-ink"
    >
      <span className="font-body text-[18px] font-bold leading-[23px]">{label}</span>
      {sub ? <span className="font-body text-[18px] font-medium italic leading-[23px]">{sub}</span> : null}
    </button>
  );
}
