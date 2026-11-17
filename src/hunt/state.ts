import type { PlanId, Stop } from './types';

const welcomeStages = ['greeting', 'introduction'] as const;
const missionStages = ['your-mission', 'keep-a-count', 'no-pressure'] as const;
const lastStopStages = ['you-made-it', 'before-we-eat', 'once-again'] as const;

type WelcomeStage = (typeof welcomeStages)[number];
type MissionStage = (typeof missionStages)[number];
type LastStopStage = (typeof lastStopStages)[number];

/** There is a single path through the Hunt, so the order lives in `screens()`. */
export type Screen =
  | { kind: 'welcome'; stage: WelcomeStage }
  | { kind: 'mission'; stage: MissionStage }
  | { kind: 'puzzle'; stop: number }
  | { kind: 'arrival'; stop: number }
  | { kind: 'reveal'; stop: number }
  | { kind: 'headedToLast' }
  | { kind: 'lastStop'; stage: LastStopStage }
  | { kind: 'final' };

/**
 * Each Stop gets Puzzle, Arrival and Reveal. The last Stop also gets its three
 * Last-Stop congratulation Stages after its Reveal, before the ending screen.
 */
export function screens(stops: readonly Stop[], plan: PlanId = 'a'): Screen[] {
  const list: Screen[] = welcomeStages.map((stage): Screen => ({ kind: 'welcome', stage }));

  if (plan === 'a') {
    list.push(...missionStages.map((stage): Screen => ({ kind: 'mission', stage })));
  }

  const last = stops.length - 1;
  for (let i = 0; i <= last; i += 1) {
    if (i === last && last > 0) list.push({ kind: 'headedToLast' });
    list.push({ kind: 'puzzle', stop: i }, { kind: 'arrival', stop: i }, { kind: 'reveal', stop: i });
  }
  if (last >= 0) {
    list.push(...lastStopStages.map((stage): Screen => ({ kind: 'lastStop', stage })));
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

  const list = screens(stops, state.plan);
  const current = list[state.at];
  if (!current) return state;

  // Puzzles are never graded; "I'm here" is the only way off this screen.
  if (action.type === 'advance' && current.kind === 'puzzle') return state;
  if (action.type === 'imHere' && current.kind !== 'puzzle') return state;

  const next = Math.min(state.at + 1, list.length - 1);
  return next === state.at ? state : { ...state, at: next };
}

export function currentStop(state: HuntState, stops: readonly Stop[]): Stop | undefined {
  const screen = screens(stops, state.plan)[state.at];
  if (!screen) return undefined;
  if (screen.kind === 'lastStop') return stops[stops.length - 1];
  if (screen.kind === 'puzzle' || screen.kind === 'arrival' || screen.kind === 'reveal') return stops[screen.stop];
  return undefined;
}
