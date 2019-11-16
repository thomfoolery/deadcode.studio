import { IAction } from './';

export enum GameState {
  GameTitle,
  GamePaused,
  GamePlaying,
}

export enum GameActionTypes {
  SetGameState = 'SetIsConsoleEnabled',
}

export interface IGameState {
  state: GameState;
}

export const defaultState: IGameState = {
  state: GameState.GameTitle,
};

export function stateReducer(state: IGameState, action: IAction) {
  switch(action.type) {

    case GameActionTypes.SetGameState:
      return {
        ...state,
        state: action.payload,
      };

    default:
      return state;
  }
}
