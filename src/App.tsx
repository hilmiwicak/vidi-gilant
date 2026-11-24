import { reveals } from './hunt/data/reveals';
import { useHunt } from './hunt/useHunt';
import { Arrival } from './screens/Arrival';
import { Final } from './screens/Final';
import { HeadingToLastStop } from './screens/HeadingToLastStop';
import { LastStopBeforeWeEat } from './screens/LastStopBeforeWeEat';
import { LastStopOnceAgain } from './screens/LastStopOnceAgain';
import { LastStopYouMadeIt } from './screens/LastStopYouMadeIt';
import { MissionKeepCount } from './screens/MissionKeepCount';
import { MissionNoPressure } from './screens/MissionNoPressure';
import { MissionYourMission } from './screens/MissionYourMission';
import { Puzzle } from './screens/Puzzle';
import { RevealSong } from './screens/RevealSong';
import { RevealText } from './screens/RevealText';
import { RevealVideo } from './screens/RevealVideo';
import { RevealVoice } from './screens/RevealVoice';
import { WelcomeGreeting } from './screens/WelcomeGreeting';
import { WelcomeIntroduction } from './screens/WelcomeIntroduction';

export default function App() {
  const { state, stops, screen, dispatch } = useHunt();
  const advance = () => dispatch({ type: 'advance' });

  const counter = {
    boxes: state.boxes,
    onSubtract: () => dispatch({ type: 'boxes', delta: -1 }),
    onAdd: () => dispatch({ type: 'boxes', delta: 1 }),
  };

  if (screen.kind === 'welcome' && screen.stage === 'greeting') {
    return <WelcomeGreeting onNext={advance} />;
  }

  if (screen.kind === 'welcome' && screen.stage === 'introduction') {
    return <WelcomeIntroduction onStart={advance} />;
  }

  if (screen.kind === 'mission') {
    if (screen.stage === 'your-mission') return <MissionYourMission onNext={advance} />;
    if (screen.stage === 'keep-a-count') return <MissionKeepCount {...counter} onNext={advance} />;
    return <MissionNoPressure {...counter} onNext={advance} />;
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
    return <Arrival stop={stops[screen.stop]} onContinue={advance} />;
  }

  if (screen.kind === 'reveal') {
    const reveal = reveals[stops[screen.stop].id];
    switch (reveal.type) {
      case 'text':
        return <RevealText body={reveal.body} onContinue={advance} />;
      case 'video':
        return <RevealVideo onContinue={advance} />;
      case 'voice':
        return <RevealVoice onContinue={advance} />;
      case 'song':
        return <RevealSong onContinue={advance} />;
    }
  }

  if (screen.kind === 'headedToLast') {
    return <HeadingToLastStop onContinue={advance} />;
  }

  if (screen.kind === 'lastStop') {
    if (screen.stage === 'you-made-it') {
      return <LastStopYouMadeIt stop={stops[stops.length - 1]} onContinue={advance} />;
    }
    if (screen.stage === 'before-we-eat') return <LastStopBeforeWeEat onContinue={advance} />;
    return <LastStopOnceAgain onContinue={advance} />;
  }

  return <Final boxes={state.boxes} />;
}
