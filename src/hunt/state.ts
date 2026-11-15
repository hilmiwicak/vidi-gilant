import type { PlanId, Stop } from './types';

const lastStopStages = ['you-made-it', 'before-we-eat', 'once-again'] as const;

/** There is a single path through the Hunt, so the order lives in `screens()`. */
export type Screen =
  | { kind: 'welcome'; stage: 'greeting' | 'introduction' }
  | { kind: 'mission'; stage: 'your-mission' | 'keep-a-count' | 'no-pressure' }
  | { kind: 'puzzle'; stop: number }
  | { kind: 'arrival'; stop: number }
  | { kind: 'reveal'; stop: number }
  | { kind: 'headedToLast' }
  | { kind: 'lastStop'; stage: (typeof lastStopStages)[number] }
  | { kind: 'final' };

/**
 * Each Stop gets Puzzle, Arrival, Reveal. The last Stop has no Reveal: its letter is the
 * Last-Stop congratulation, so it gets Puzzle, Arrival and three Stages.
 */
export function screens(stops: readonly Stop[]): Screen[] {
  const list: Screen[] = [
    { kind: 'welcome', stage: 'greeting' },
    { kind: 'welcome', stage: 'introduction' },
    { kind: 'mission', stage: 'your-mission' },
    { kind: 'mission', stage: 'keep-a-count' },
    { kind: 'mission', stage: 'no-pressure' },
  ];

  const last = stops.length - 1;
  for (let i = 0; i < last; i += 1) {
    list.push({ kind: 'puzzle', stop: i }, { kind: 'arrival', stop: i }, { kind: 'reveal', stop: i });
  }
  if (last > 0) list.push({ kind: 'headedToLast' });
  if (last >= 0) {
    list.push({ kind: 'puzzle', stop: last }, { kind: 'arrival', stop: last });
    for (const stage of lastStopStages) list.push({ kind: 'lastStop', stage });
  }
  list.push({ kind: 'final' });
  return list;
}

export type HuntState = {
  plan: PlanId;
  /** Index into `screens(stops)`. */
  at: number;
  /** Never gates Stop progression. The ending screen shows a total when this is above zero. */
  boxes: number;
};

export type HuntAction =
  /** Next, Start, See Puzzle 1, See the last Puzzle, Continue: every tap-to-advance frame. */
  | { type: 'advance' }
  /** The manual Arrival button. Phase 4 adds automatic Arrival beside it. */
  | { type: 'imHere' }
  | { type: 'boxes'; delta: 1 | -1 };

export function initialHuntState(plan: PlanId = 'a'): HuntState {
  return { plan, at: 0, boxes: 0 };
}

export function reduce(state: HuntState, action: HuntAction, stops: readonly Stop[]): HuntState {
  if (action.type === 'boxes') {
    const boxes = Math.max(0, state.boxes + action.delta);
    return boxes === state.boxes ? state : { ...state, boxes };
  }

  const list = screens(stops);
  const current = list[state.at];
  if (!current) return state;

  // Puzzles are never graded; "I'm here" is the only way off this screen.
  if (action.type === 'advance' && current.kind === 'puzzle') return state;
  if (action.type === 'imHere' && current.kind !== 'puzzle') return state;

  const next = Math.min(state.at + 1, list.length - 1);
  return next === state.at ? state : { ...state, at: next };
}

export function currentStop(state: HuntState, stops: readonly Stop[]): Stop | undefined {
  const screen = screens(stops)[state.at];
  if (!screen) return undefined;
  if (screen.kind === 'lastStop') return stops[stops.length - 1];
  if (screen.kind === 'puzzle' || screen.kind === 'arrival' || screen.kind === 'reveal') return stops[screen.stop];
  return undefined;
}
