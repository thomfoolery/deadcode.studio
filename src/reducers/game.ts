import gameServers from '../content/servers';
import { IAction } from './';

export enum GameState {
  Title,
  Playing,
}

export enum GameActionTypes {
  SetGameState = 'SetGameState',
  Start = 'Start',
}

export const defaultState: any = {
  gameState: GameState.Title,
  gameServer: null,
  gameServerPwd: [],
};

export function stateReducer(state: any = defaultState, action: IAction) {
  switch(action.type) {

    case GameActionTypes.SetGameState:
      return {
        ...state,
        gameState: action.payload,
      };

    case GameActionTypes.Start:
      return {
        ...state,
        gameState: GameState.Playing,
        gameServer: gameServers.home,
        gameServerPwd: [],
      };

    default:
      return state;
  }
}
