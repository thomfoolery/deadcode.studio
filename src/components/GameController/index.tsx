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
  IGameState,
} from '../../reducers';

import DevTools from '../DevTools';
import { getEntry } from './utils';

interface IProps {
  storyEngine: any;
  children(state: IGameState): ReactElement | null;
}

interface IGameControllerContext {
  setIsConsoleEnabled(isEnabled: boolean): void;
  next(index?: number | string): void;
  storyEngine: any;
}

export const GameControllerContext = React.createContext<IGameControllerContext>({
  setIsConsoleEnabled: () => null,
  next: () => null,
  storyEngine: {},
});

function GameController({ storyEngine, children }: IProps) {
  const [state, dispatch] = useReducer(stateReducer, defaultState);

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
  }, [storyEngine]);

  const gameControllerContext: IGameControllerContext = {
    setIsConsoleEnabled: (payload) => {
      dispatch({ type: ActionTypes.SetIsConsoleEnabled, payload });
    },
    storyEngine,
    next,
  };

  return (
    <GameControllerContext.Provider value={gameControllerContext}>
      <DevTools dispatch={dispatch}/>
      {children(state)}
    </GameControllerContext.Provider>
  );
}

export default React.memo(GameController);
