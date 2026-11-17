import type { PlanId, Stop } from './types';
import { initialHuntState, screens, type HuntState } from './state';

/** One key, one version. A stale value is discarded, not migrated. */
export const storageKey = 'vidi.hunt.v1';

type Stored = HuntState & { version: 1 };

function isPlanId(value: unknown): value is PlanId {
  return value === 'a' || value === 'b';
}

// `stopsFor` receives the saved Plan, which may differ from the `plan` argument.
export function restoreHunt(
  storage: Storage,
  stopsFor: (plan: PlanId) => readonly Stop[],
  plan: PlanId = 'a',
): HuntState {
  const fallback = initialHuntState(plan);

  let raw: string | null;
  try {
    raw = storage.getItem(storageKey);
  } catch {
    return fallback;
  }
  if (!raw) return fallback;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return fallback;
  }

  if (typeof parsed !== 'object' || parsed === null) return fallback;
  const stored = parsed as Record<string, unknown>;
  if (stored.version !== 1) return fallback;
  if (!isPlanId(stored.plan)) return fallback;

  // Reset to her Plan, not the default one: a corrupted value must not move her to Plan A.
  const reset = stored.plan === plan ? fallback : initialHuntState(stored.plan);

  const screenCount = screens(stopsFor(stored.plan), stored.plan).length;
  const at = stored.at;
  if (typeof at !== 'number' || !Number.isInteger(at) || at < 0 || at >= screenCount) return reset;

  const boxes = stored.boxes;
  if (typeof boxes !== 'number' || !Number.isInteger(boxes) || boxes < 0) return reset;

  return { plan: stored.plan, at, boxes };
}

export function saveHunt(storage: Storage, state: HuntState): void {
  const stored: Stored = { version: 1, ...state };
  try {
    storage.setItem(storageKey, JSON.stringify(stored));
  } catch {
    // Private browsing or a full quota: the Hunt still works, it just stops surviving reloads.
  }
}

export function clearHunt(storage: Storage): void {
  try {
    storage.removeItem(storageKey);
  } catch {
    // A failed clear leaves the old value, which restoreHunt still validates.
  }
}
