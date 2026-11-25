import { initialHuntState, screens, type HuntState } from './state';
import type { Stop } from './types';

/** One key, one version. A stale value is discarded, not migrated. */
export const storageKey = 'vidi.hunt.v1';

type Stored = HuntState & { version: 1 };

export function restoreHunt(storage: Storage, stops: readonly Stop[]): HuntState {
  const fallback = initialHuntState();

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

  const screenCount = screens(stops).length;
  const at = stored.at;
  if (typeof at !== 'number' || !Number.isInteger(at) || at < 0 || at >= screenCount) return fallback;

  const boxes = stored.boxes;
  if (typeof boxes !== 'number' || !Number.isInteger(boxes) || boxes < 0) return fallback;

  return { at, boxes };
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
