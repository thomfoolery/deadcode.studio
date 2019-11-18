import React, {
  useMemo,
  useReducer,
  useCallback,
} from 'react';

import {
  GameContext,
  IGameContext,
} from '../../contexts/game';

import {
  GameState,
  stateReducer,
  defaultState,
  ConsoleActionTypes,
} from '../../reducers';

import DevTools from '../DevTools';
import Console from '../Console';
import GameTitle from '../GameTitle';

import { getEntry } from './utils';
import { storyEngine } from '../../content/engine';

const MAX_ENTRIES_LENGTH = 100;

interface IProps {
  debug: boolean;
}

function GameController({ debug }: IProps) {
  const [state, dispatch] = useReducer(stateReducer, defaultState);

  const next = useCallback((input?: number | string) => {
    // DEBUG
    if (debug) {
      if (input) {
        dispatch({
          type: ConsoleActionTypes.ExecuteCommand,
          payload: input,
        });
      }
      return;
    }

    // INPUT NUMBER
    if (typeof input == 'number') {
      storyEngine.ChooseChoiceIndex(input);
      dispatch({
        type: ConsoleActionTypes.SetChoices,
        payload: [],
      });
    }

    // INPUT STRING
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

    // IF THERE ARE LINES IN THE HOPPER
    if (state.consoleBuffer.length > 0) {
      dispatch({ type: ConsoleActionTypes.AdvanceBuffer });
    }
    // ELSE
    else {
      const entry = getEntry(storyEngine);

      // IF THERE ARE ANY CHOICES
      if ('consoleChoices' in entry) {
        dispatch({
          type: ConsoleActionTypes.SetChoices,
          payload: storyEngine.currentChoices,
        });

      }
      // TRY TO FILL THE HOPPER
      else {
        dispatch({
          type: ConsoleActionTypes.AppendToBuffer,
          payload: [entry],
        });
      }
    }
  }, [state, dispatch]);

  const gameContext: IGameContext = useMemo(() => ({
    storyEngine,
    dispatch,
    debug,
    state,
    next,
  }), [storyEngine, dispatch, debug, state, next]);

  return (
    <GameContext.Provider value={gameContext}>
      <DevTools/>
      {/* GAME TITLE */
       state.gameState === GameState.Title &&
        <GameTitle/>
      }
      {/* GAME PLAYING */
        state.gameState === GameState.Playing &&
        <Console
          consoleChoices={state.consoleChoices}
          entries={state.consoleEntries.slice(MAX_ENTRIES_LENGTH * -1)}
        />
      }
    </GameContext.Provider>
  );
}

export default React.memo(GameController);
