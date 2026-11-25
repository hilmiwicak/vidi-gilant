import { useCallback, useEffect, useState } from 'react';
import { stops } from './data/stops';
import { restoreHunt, saveHunt } from './persistence';
import { reduce, screens, type HuntAction, type HuntState } from './state';

/**
 * The Hunt's only source of truth in React. Restores the saved progress once,
 * saves after every change, and exposes the current screen beside the state.
 */
export function useHunt() {
  const [state, setState] = useState<HuntState>(() => restoreHunt(window.localStorage, stops));

  useEffect(() => {
    saveHunt(window.localStorage, state);
  }, [state]);

  const dispatch = useCallback((action: HuntAction) => {
    setState((current) => reduce(current, action, stops));
  }, []);

  const screen = screens(stops)[state.at];

  return { state, stops, screen, dispatch };
}
