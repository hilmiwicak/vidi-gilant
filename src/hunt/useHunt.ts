import { useCallback, useEffect, useState } from 'react';
import { plans } from './data/plans';
import { restoreHunt, saveHunt } from './persistence';
import { reduce, screens, type HuntAction, type HuntState } from './state';

/**
 * The Hunt's only source of truth in React. Restores the saved progress once,
 * saves after every change, and exposes the current screen beside the state.
 */
export function useHunt() {
  const [state, setState] = useState<HuntState>(() => restoreHunt(window.localStorage, (plan) => plans[plan]));

  useEffect(() => {
    saveHunt(window.localStorage, state);
  }, [state]);

  const dispatch = useCallback((action: HuntAction) => {
    setState((current) => reduce(current, action, plans[current.plan]));
  }, []);

  const stops = plans[state.plan];
  const screen = screens(stops, state.plan)[state.at];

  return { state, stops, screen, dispatch };
}
