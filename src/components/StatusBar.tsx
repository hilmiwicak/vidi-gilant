import { Icon } from './Icon';

/**
 * The drawn Status Bar from the approved frames, fixed at 9:41 like the designs.
 * A real device shows its own status bar; this one keeps localhost screenshots
 * and the Pencil frames comparable.
 */
export function StatusBar() {
  return (
    <div className="flex h-[62px] shrink-0 items-center justify-between px-[30px] font-system text-[17px] font-semibold text-ink">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Icon name="signal_cellular_alt" size={20} />
        <Icon name="wifi" size={20} />
        <Icon name="battery_full" size={20} />
      </div>
    </div>
  );
}
