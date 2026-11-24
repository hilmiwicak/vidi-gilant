import { useHunt } from './hunt/useHunt';
import { reveals } from './hunt/data/reveals';
import type { HuntAction, HuntState, Screen } from './hunt/state';
import { Arrival } from './screens/Arrival';
import { MissionKeepCount } from './screens/MissionKeepCount';
import { MissionNoPressure } from './screens/MissionNoPressure';
import { MissionYourMission } from './screens/MissionYourMission';
import { Puzzle } from './screens/Puzzle';
import { RevealText } from './screens/RevealText';
import { WelcomeGreeting } from './screens/WelcomeGreeting';
import { WelcomeIntroduction } from './screens/WelcomeIntroduction';

// Temporary shell: shows every screen the Welcome phases have not reached yet.
// The approved Mission and Puzzle screens replace it next.
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

function DebugShell({
  state,
  screen,
  dispatch,
}: {
  state: HuntState;
  screen: Screen;
  dispatch: (action: HuntAction) => void;
}) {
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

export default function App() {
  const { state, stops, screen, dispatch } = useHunt();

  const counter = {
    boxes: state.boxes,
    onSubtract: () => dispatch({ type: 'boxes', delta: -1 }),
    onAdd: () => dispatch({ type: 'boxes', delta: 1 }),
  };

  if (screen.kind === 'welcome' && screen.stage === 'greeting') {
    return <WelcomeGreeting onNext={() => dispatch({ type: 'advance' })} />;
  }

  if (screen.kind === 'welcome' && screen.stage === 'introduction') {
    return <WelcomeIntroduction onStart={() => dispatch({ type: 'advance' })} />;
  }

  if (screen.kind === 'mission') {
    const onNext = () => dispatch({ type: 'advance' });

    if (screen.stage === 'your-mission') return <MissionYourMission onNext={onNext} />;
    if (screen.stage === 'keep-a-count') return <MissionKeepCount {...counter} onNext={onNext} />;
    return <MissionNoPressure {...counter} onNext={onNext} />;
  }

  if (screen.kind === 'puzzle') {
    return (
      <Puzzle
        stop={stops[screen.stop]}
        showCounter={state.plan === 'a'}
        {...counter}
        onImHere={() => dispatch({ type: 'imHere' })}
      />
    );
  }

  if (screen.kind === 'arrival') {
    return <Arrival stop={stops[screen.stop]} onContinue={() => dispatch({ type: 'advance' })} />;
  }

  if (screen.kind === 'reveal') {
    const reveal = reveals[stops[screen.stop].id];
    // Voice, video and song get their own cards once the real content exists.
    if (reveal.type === 'text') {
      return <RevealText body={reveal.body} onContinue={() => dispatch({ type: 'advance' })} />;
    }
  }

  return <DebugShell state={state} screen={screen} dispatch={dispatch} />;
}
