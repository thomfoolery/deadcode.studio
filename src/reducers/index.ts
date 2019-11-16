import {
  IConsoleState,
  stateReducer as consoleStateReducer,
  defaultState as consoleDefaultState,
} from './console';

import {
  IGameState,
  stateReducer as gameStateReducer,
  defaultState as gameDefaultState,
} from './game';

export { GameActionTypes } from './game';
export { ConsoleActionTypes } from './console';

export interface IAction {
  type: any;
  payload?: any;
}

export interface IState {
  game: IGameState;
  console: IConsoleState;
}

export const defaultState: IState = {
  game: gameDefaultState,
  console: consoleDefaultState,
};

export function stateReducer(state: IState, action: IAction) {
  return {
    game: gameStateReducer(state.game, action),
    console: consoleStateReducer(state.console, action),
  }
}
