import { useHunt } from './hunt/useHunt';
import type { Screen } from './hunt/state';

// Temporary shell: proves the state machine and localStorage reach React.
// The approved Welcome and Mission screens replace it next.
function describe(screen: Screen): string {
  switch (screen.kind) {
    case 'welcome':
      return `Welcome · ${screen.stage}`;
    case 'mission':
      return `Mission · ${screen.stage}`;
    case 'puzzle':
      return `Puzzle · Stop ${screen.stop + 1}`;
    case 'arrival':
      return `Arrival · Stop ${screen.stop + 1}`;
    case 'reveal':
      return `Reveal · Stop ${screen.stop + 1}`;
    case 'headedToLast':
      return 'Heading to the last Stop';
    case 'lastStop':
      return `Last-Stop congratulation · ${screen.stage}`;
    case 'final':
      return 'Final';
  }
}

export default function App() {
  const { state, screen, dispatch } = useHunt();

  const button = 'rounded-control border-2 border-ink px-4 py-3 text-base font-semibold';

  return (
    <main className="flex min-h-dvh flex-col justify-center gap-8 bg-ground p-6 text-ink">
      <div className="space-y-2">
        <p className="text-sm text-ink-soft">
          Plan {state.plan.toUpperCase()} · screen {state.at + 1} · {state.boxes} boxes
        </p>
        <h1 className="text-3xl font-bold">{describe(screen)}</h1>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className={button} onClick={() => dispatch({ type: 'advance' })}>
          Next
        </button>
        <button className={button} onClick={() => dispatch({ type: 'imHere' })}>
          I&apos;m here
        </button>
        <button className={button} onClick={() => dispatch({ type: 'boxes', delta: -1 })}>
          −1 box
        </button>
        <button className={button} onClick={() => dispatch({ type: 'boxes', delta: 1 })}>
          +1 box
        </button>
      </div>
    </main>
  );
}
