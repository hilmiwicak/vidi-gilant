import { describe, expect, it } from 'vitest';
import { stops } from './data/stops';
import { clearHunt, restoreHunt, saveHunt, storageKey } from './persistence';
import { initialHuntState, reduce, screens, type HuntState } from './state';

function memoryStorage(seed?: string): Storage {
  const values = new Map<string, string>();
  if (seed !== undefined) values.set(storageKey, seed);
  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    key: (index: number) => [...values.keys()][index] ?? null,
    removeItem: (key: string) => void values.delete(key),
    setItem: (key: string, value: string) => void values.set(key, value),
  };
}

function restore(storage: Storage) {
  return restoreHunt(storage, stops);
}

describe('restoreHunt', () => {
  it('starts a fresh Hunt when nothing is stored', () => {
    expect(restore(memoryStorage())).toEqual(initialHuntState());
  });

  it('returns her to exactly where she was, including the last screen', () => {
    const lastAt = screens(stops).length - 1;
    const state: HuntState = { at: lastAt, boxes: 4 };
    const storage = memoryStorage();
    saveHunt(storage, state);
    expect(restore(storage)).toEqual(state);
  });

  it('round-trips every screen', () => {
    screens(stops).forEach((_screen, at) => {
      const storage = memoryStorage();
      const state: HuntState = { at, boxes: 2 };
      saveHunt(storage, state);
      expect(restore(storage)).toEqual(state);
    });
  });

  it('survives a reload after counting up and back down', () => {
    let state = initialHuntState();
    state = reduce(state, { type: 'boxes', delta: 1 }, stops);
    state = reduce(state, { type: 'boxes', delta: -1 }, stops);
    const storage = memoryStorage();
    saveHunt(storage, state);
    expect(restore(storage)).toEqual(state);
  });

  it('discards a value from a different version instead of guessing', () => {
    const stored = JSON.stringify({ version: 2, at: 3, boxes: 1 });
    expect(restore(memoryStorage(stored))).toEqual(initialHuntState());
  });

  it('discards unreadable or foreign values', () => {
    for (const seed of ['', 'not json', 'null', '42', '[]', '{}']) {
      expect(restore(memoryStorage(seed))).toEqual(initialHuntState());
    }
  });

  it('discards a screen index the Hunt does not have', () => {
    const tooFar = JSON.stringify({ version: 1, at: screens(stops).length, boxes: 0 });
    expect(restore(memoryStorage(tooFar))).toEqual(initialHuntState());
  });

  it('discards a negative or non-integer Boxes count', () => {
    const negative = JSON.stringify({ version: 1, at: 0, boxes: -2 });
    const fractional = JSON.stringify({ version: 1, at: 0, boxes: 1.5 });
    expect(restore(memoryStorage(negative))).toEqual(initialHuntState());
    expect(restore(memoryStorage(fractional))).toEqual(initialHuntState());
  });

  it('ignores fields an older build may have saved, including a Plan', () => {
    const legacy = JSON.stringify({ version: 1, plan: 'a', at: 2, boxes: 6, step: { kind: 'final' } });
    expect(restore(memoryStorage(legacy))).toEqual({ at: 2, boxes: 6 });
  });
});

describe('saveHunt', () => {
  it('survives a storage that refuses to write', () => {
    const storage = memoryStorage();
    storage.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    expect(() => saveHunt(storage, initialHuntState())).not.toThrow();
  });

  it('survives a storage that refuses to read', () => {
    const storage = memoryStorage();
    storage.getItem = () => {
      throw new Error('SecurityError');
    };
    expect(() => restore(storage)).not.toThrow();
    expect(restore(storage)).toEqual(initialHuntState());
  });
});

describe('clearHunt', () => {
  it('forgets the saved Hunt', () => {
    const storage = memoryStorage();
    saveHunt(storage, { at: 3, boxes: 3 });
    clearHunt(storage);
    expect(restore(storage)).toEqual(initialHuntState());
  });
});
