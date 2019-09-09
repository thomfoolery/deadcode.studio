import {
  ConsoleEntryTypes,
  IConsoleState,
} from '../types';

export enum ActionTypes {
  AppendCommandToEntries,
  AppendOutputToEntries,
}

export interface IAction {
  type: ActionTypes;
  payload?: any;
}

export const defaultState = {
  consoleEntries: [],
};

export function stateReducer(state: IConsoleState, action: IAction) {
  switch(action.type) {

    case ActionTypes.AppendCommandToEntries:
      return {
        ...state,
        consoleEntries: [
          ...state.consoleEntries,
          {
            type: ConsoleEntryTypes.Command,
            content: action.payload,
          },
        ],
      };

    case ActionTypes.AppendOutputToEntries:
      return {
        ...state,
        consoleEntries: [
          ...state.consoleEntries,
          {
            type: ConsoleEntryTypes.Output,
            content: action.payload,
          },
        ],
      }

    default:
      return state;
  }
}
