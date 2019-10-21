import React, {
  useEffect,
  useReducer,
  useCallback,
  ReactElement,
} from 'react';

import {
  stateReducer,
  defaultState,
  ActionTypes,
} from '../../reducers/console';

import { getEntry } from './utils';

interface IProps {
  storyEngine: any;
  children(next, state, dispatch): ReactElement | null;
}

interface IConsoleContext {
  setIsConsoleEnabled(payload: boolean): void;
  isConsoleEnabled: boolean;
}

export const ConsoleContext = React.createContext<IConsoleContext>({
  setIsConsoleEnabled: () => null,
  isConsoleEnabled: false,
});

function Game({ storyEngine, children }: IProps) {
  const [state, dispatch] = useReducer(stateReducer, defaultState);
  const consoleContext: IConsoleContext = {
    setIsConsoleEnabled: (payload) => {
      dispatch({ type: ActionTypes.SetIsConsoleEnabled, payload });
    },
    isConsoleEnabled: state.isConsoleEnabled,
  };

  const next = useCallback((input?: number | string) => {
    if (typeof input == 'number') {
      storyEngine.ChooseChoiceIndex(input);
      dispatch({
        type: ActionTypes.SetChoices,
        payload: null,
      });
    }

    if (typeof input === 'string') {
      if (
        input === '' ||
        storyEngine.canContinue ||
        storyEngine.currentChoices.length > 0
      ) return;

      dispatch({
        type: ActionTypes.ExecuteCommand,
        payload: input,
      });

    }

    if (state.consoleBuffer.length > 0) {
      dispatch({ type: ActionTypes.AdvanceBuffer });
    }
    else {
      const entry = getEntry(storyEngine);

      if (entry) {
        dispatch({
          type: ActionTypes.AppendToBuffer,
          payload: [entry],
        });
      }
      else if (state.choices === null && storyEngine.currentChoices.length > 0) {
        dispatch({
          type: ActionTypes.SetChoices,
          payload: storyEngine.currentChoices,
        });
      }
    }
  }, [storyEngine])

  // start game
  useEffect(() => { next(); }, [next]);

  return (
    <ConsoleContext.Provider value={consoleContext}>
      {children(next, state, dispatch)}
    </ConsoleContext.Provider>
  );
}

export default React.memo(Game);
