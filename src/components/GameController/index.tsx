

import React, {
  useReducer,
  useCallback,
} from 'react';

import {
  IAction,
  stateReducer,
  defaultState,
  ConsoleActionTypes,
} from '../../reducers';

import DevTools from '../DevTools';
import Console from '../Console';
import GameTitle from '../GameTitle';

import { getEntry } from './utils';
import { storyEngine } from './ink-story';
import { GameState } from '../../reducers/game';

const MAX_ENTRIES_LENGTH = 100;

interface IGameControllerContext {
  state: any;
  storyEngine: any;
  dispatch(action: IAction): void;
  next(index?: number | string): void;
}

export const GameControllerContext = React.createContext<IGameControllerContext>({
  storyEngine: {},
  dispatch: () => null,
  next: () => null,
  state: {},
});

function GameController() {
  const [state, dispatch] = useReducer(stateReducer, defaultState);

  const next = useCallback((input?: number | string) => {
    if (typeof input == 'number') {
      storyEngine.ChooseChoiceIndex(input);
      dispatch({
        type: ConsoleActionTypes.SetChoices,
        payload: [],
      });
    }

    if (typeof input === 'string') {
      if (
        input === '' ||
        storyEngine.canContinue ||
        storyEngine.currentChoices.length > 0
      ) return;

      dispatch({
        type: ConsoleActionTypes.ExecuteCommand,
        payload: input,
      });
    }

    if (state.console.consoleBuffer.length > 0) {
      dispatch({ type: ConsoleActionTypes.AdvanceBuffer });
    }
    else {
      const entry = getEntry(storyEngine);

      if (entry) {
        dispatch({
          type: ConsoleActionTypes.AppendToBuffer,
          payload: [entry],
        });
      }
      else if (
        state.console.choices.length === 0 &&
        storyEngine.currentChoices.length > 0
      ) {
        dispatch({
          type: ConsoleActionTypes.SetChoices,
          payload: storyEngine.currentChoices,
        });
      }
    }
  }, [storyEngine]);

  const gameControllerContext: IGameControllerContext = {
    storyEngine,
    dispatch,
    state,
    next,
  };

  return (
    <GameControllerContext.Provider value={gameControllerContext}>
      <DevTools/>
      {
       state.game.state === GameState.GameTitle &&
        <GameTitle/>
      }
      {
        state.game.state === GameState.GamePlaying &&
        <Console
          choices={state.console.choices}
          entries={state.console.consoleEntries.slice(MAX_ENTRIES_LENGTH * -1)}
        />
      }
    </GameControllerContext.Provider>
  );
}

export default React.memo(GameController);
