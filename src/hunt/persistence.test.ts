import { describe, expect, it } from 'vitest';
import { planA, planB, plans } from './data/plans';
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
  return restoreHunt(storage, (plan) => plans[plan]);
}

describe('restoreHunt', () => {
  it('starts a fresh Hunt when nothing is stored', () => {
    expect(restore(memoryStorage())).toEqual(initialHuntState());
  });

  it('returns her to exactly where she was, including the last screen', () => {
    const lastAt = screens(planB).length - 1;
    const state: HuntState = { plan: 'b', at: lastAt, boxes: 4 };
    const storage = memoryStorage();
    saveHunt(storage, state);
    expect(restore(storage)).toEqual(state);
  });

  it('round-trips every screen in both Plans', () => {
    for (const plan of [planA, planB]) {
      screens(plan).forEach((_screen, at) => {
        const storage = memoryStorage();
        const state: HuntState = { plan: plan === planA ? 'a' : 'b', at, boxes: 2 };
        saveHunt(storage, state);
        expect(restore(storage)).toEqual(state);
      });
    }
  });

  it('survives a reload after counting up and back down', () => {
    let state = initialHuntState();
    state = reduce(state, { type: 'boxes', delta: 1 }, planA);
    state = reduce(state, { type: 'boxes', delta: -1 }, planA);
    const storage = memoryStorage();
    saveHunt(storage, state);
    expect(restore(storage)).toEqual(state);
  });

  it('discards a value from a different version instead of guessing', () => {
    const stored = JSON.stringify({ version: 2, plan: 'a', at: 3, boxes: 1 });
    expect(restore(memoryStorage(stored))).toEqual(initialHuntState());
  });

  it('discards unreadable or foreign values', () => {
    for (const seed of ['', 'not json', 'null', '42', '[]', '{}']) {
      expect(restore(memoryStorage(seed))).toEqual(initialHuntState());
    }
  });

  it('discards a screen index that the saved Plan does not have', () => {
    const tooFar = JSON.stringify({ version: 1, plan: 'b', at: screens(planB).length, boxes: 0 });
    expect(restore(memoryStorage(tooFar))).toEqual(initialHuntState('b'));
  });

  it('keeps her Plan when the screen is corrupt', () => {
    const corrupt = JSON.stringify({ version: 1, plan: 'b', at: -1, boxes: 0 });
    expect(restore(memoryStorage(corrupt)).plan).toBe('b');
  });

  it('discards an unknown Plan or a negative Boxes count', () => {
    const badPlan = JSON.stringify({ version: 1, plan: 'c', at: 0, boxes: 0 });
    const badBoxes = JSON.stringify({ version: 1, plan: 'a', at: 0, boxes: -2 });
    expect(restore(memoryStorage(badPlan))).toEqual(initialHuntState());
    expect(restore(memoryStorage(badBoxes))).toEqual(initialHuntState());
  });

  it('ignores fields an older build may have saved', () => {
    const legacy = JSON.stringify({ version: 1, plan: 'a', at: 2, boxes: 6, boxesUsed: true, step: { kind: 'final' } });
    expect(restore(memoryStorage(legacy))).toEqual({ plan: 'a', at: 2, boxes: 6 });
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
    saveHunt(storage, { plan: 'a', at: 3, boxes: 3 });
    clearHunt(storage);
    expect(restore(storage)).toEqual(initialHuntState());
  });
});
