import { createContext } from 'react';
import { IAction } from '../reducers';

export interface IGameContext {
  state: any;
  debug: boolean;
  storyEngine: any;
  dispatch(action: IAction): void;
  next(index?: number | string): void;
}

export const GameContext = createContext<IGameContext>({
  storyEngine: {},
  dispatch: () => null,
  next: () => null,
  debug: false,
  state: {},
});
