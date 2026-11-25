import { describe, expect, it } from 'vitest';
import { stops } from './data/stops';
import { currentStop, initialHuntState, reduce, screens, type HuntAction, type HuntState } from './state';

const advance: HuntAction = { type: 'advance' };
const imHere: HuntAction = { type: 'imHere' };

function kindAt(state: HuntState, list = stops) {
  return screens(list)[state.at].kind;
}

/** Play forward to the first screen of this kind, pressing "I'm here" on Puzzles. */
function playTo(kind: string, list = stops, from = initialHuntState()) {
  let state = from;
  for (let i = 0; i < 200; i += 1) {
    if (kindAt(state, list) === kind) return state;
    const action = kindAt(state, list) === 'puzzle' ? imHere : advance;
    const next = reduce(state, action, list);
    if (next === state) break;
    state = next;
  }
  throw new Error(`never reached a ${kind} screen`);
}

describe('screens', () => {
  it('opens with two Welcome Stages, then the three Mission Stages', () => {
    expect(screens(stops).slice(0, 5)).toEqual([
      { kind: 'welcome', stage: 'greeting' },
      { kind: 'welcome', stage: 'introduction' },
      { kind: 'mission', stage: 'your-mission' },
      { kind: 'mission', stage: 'keep-a-count' },
      { kind: 'mission', stage: 'no-pressure' },
    ]);
  });

  it('gives every Stop Puzzle, Arrival and Reveal, then the final congratulation', () => {
    const list = screens(stops);
    const forStop = (stop: number) => list.filter((s) => 'stop' in s && s.stop === stop).map((s) => s.kind);
    expect(forStop(0)).toEqual(['puzzle', 'arrival', 'reveal']);
    expect(forStop(stops.length - 2)).toEqual(['puzzle', 'arrival', 'reveal']);
    expect(forStop(stops.length - 1)).toEqual(['puzzle', 'arrival', 'reveal']);
  });

  it('puts the last-Stop flow before the final screen', () => {
    expect(screens(stops).slice(-8)).toEqual([
      { kind: 'headedToLast' },
      { kind: 'puzzle', stop: stops.length - 1 },
      { kind: 'arrival', stop: stops.length - 1 },
      { kind: 'reveal', stop: stops.length - 1 },
      { kind: 'lastStop', stage: 'you-made-it' },
      { kind: 'lastStop', stage: 'before-we-eat' },
      { kind: 'lastStop', stage: 'once-again' },
      { kind: 'final' },
    ]);
  });

  it('drops the heading screen for a Hunt with a single Stop', () => {
    const kinds = screens([stops[0]]).map((s) => s.kind);
    expect(kinds).not.toContain('headedToLast');
    expect(kinds.filter((k) => k === 'lastStop')).toHaveLength(3);
  });
});

describe('advance', () => {
  it('reaches the final screen and stays there', () => {
    const end = playTo('final');
    expect(kindAt(end)).toBe('final');
    expect(reduce(end, advance, stops)).toBe(end);
  });

  it('does nothing on a Puzzle, because a Puzzle is never graded', () => {
    const puzzle = playTo('puzzle');
    expect(reduce(puzzle, advance, stops)).toBe(puzzle);
  });
});

describe("I'm here", () => {
  it('reaches Arrival from the Puzzle screen', () => {
    const puzzle = playTo('puzzle');
    expect(kindAt(reduce(puzzle, imHere, stops))).toBe('arrival');
  });

  it('does nothing on any screen but a Puzzle', () => {
    for (const kind of ['welcome', 'mission', 'arrival', 'reveal', 'headedToLast', 'lastStop', 'final']) {
      const state = playTo(kind);
      expect(reduce(state, imHere, stops)).toBe(state);
    }
  });
});

describe('Boxes counter', () => {
  it('adds and subtracts one at a time', () => {
    let state = initialHuntState();
    state = reduce(state, { type: 'boxes', delta: 1 }, stops);
    state = reduce(state, { type: 'boxes', delta: 1 }, stops);
    expect(state.boxes).toBe(2);
    expect(reduce(state, { type: 'boxes', delta: -1 }, stops).boxes).toBe(1);
  });

  it('never goes below zero', () => {
    const zero = reduce(initialHuntState(), { type: 'boxes', delta: -1 }, stops);
    expect(zero.boxes).toBe(0);
    expect(reduce(zero, { type: 'boxes', delta: -1 }, stops)).toBe(zero);
  });

  it('never moves her to another screen', () => {
    const state = playTo('puzzle');
    expect(reduce(state, { type: 'boxes', delta: 1 }, stops).at).toBe(state.at);
  });

  it('counts from the first Mission Stage onward', () => {
    const state = playTo('mission');
    expect(reduce(state, { type: 'boxes', delta: 1 }, stops).boxes).toBe(1);
  });
});

describe('currentStop', () => {
  it('is undefined during the Welcome, the Mission and the final screen', () => {
    for (const kind of ['welcome', 'mission', 'final']) {
      expect(currentStop(playTo(kind), stops)).toBeUndefined();
    }
  });

  it('is the Stop whose Puzzle she is reading', () => {
    expect(currentStop(playTo('puzzle'), stops)).toBe(stops[0]);
  });

  it('is the dinner during the Last-Stop Stages, which print its name', () => {
    expect(currentStop(playTo('lastStop'), stops)?.id).toBe(stops[stops.length - 1].id);
  });
});
