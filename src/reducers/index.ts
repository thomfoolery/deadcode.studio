import {
  stateReducer as consoleStateReducer,
  defaultState as consoleDefaultState,
} from './console';

import {
  stateReducer as gameStateReducer,
  defaultState as gameDefaultState,
} from './game';

export {
  ConsoleActionTypes,
} from './console';

export {
  GameState,
  GameActionTypes,
} from './game';

export interface IAction {
  type: any;
  payload?: any;
}

export const defaultState: any = {
  ...gameDefaultState,
  ...consoleDefaultState,
};

export function stateReducer(state: any, action: IAction) {
  const gameState = gameStateReducer(state, action);
  const finalState = consoleStateReducer(gameState, action);

  return finalState;
}
