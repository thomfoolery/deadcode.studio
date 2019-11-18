import { executeConsoleCommand } from '../commands';
import { IAction } from './';

export enum ConsoleActionTypes {
  SetIsConsoleEnabled = 'SetIsConsoleEnabled',
  ExecuteCommand = 'ExecuteCommand',
  AppendToConsole = 'AppendToConsole',
  AppendToBuffer = 'AppendToBuffer',
  AdvanceBuffer = 'AdvanceBuffer',
  UpdateSelectedChoice = 'UpdateSelectedChoice',
  SetChoices = 'SetChoices',
  Reset = 'Reset',
}

export enum ConsoleEntryTypes {
  Output = 'output',
  Command = 'command',
  Special = 'special',
}

export interface IConsoleEntry {
  type: ConsoleEntryTypes;
  content: string;
  options?: any;
  tags?: any;
}

export interface IConsoleChoice {
  isSelected: boolean;
  content: string;
  index: number;
}

export const defaultState: any = {
  commandBuffer: [],
  consoleBuffer: [],
  consoleChoices: [],
  consoleEntries: [],
};

export function stateReducer(state: any = defaultState, action: IAction) {
  switch(action.type) {

    case ConsoleActionTypes.Reset:
      return defaultState;

    case ConsoleActionTypes.ExecuteCommand:
      return executeConsoleCommand(state, action.payload);

    case ConsoleActionTypes.AppendToConsole: {
      return {
        ...state,
        consoleEntries: state.consoleEntries.concat(action.payload),
      };
    }

    case ConsoleActionTypes.AppendToBuffer: {
      const firstBufferEntry = action.payload[0];
      const bufferEntries = action.payload.slice(1);

      return {
        ...state,
        consoleBuffer: state.consoleBuffer.concat(bufferEntries),
        consoleEntries: state.consoleEntries.concat(firstBufferEntry),
      };
    }

    case ConsoleActionTypes.AdvanceBuffer: {
      if (state.consoleBuffer.length === 0) {
        return state
      }

      const bufferEntry = state.consoleBuffer[0];
      const updatedConsoleBuffer = state.consoleBuffer.slice(1);

      return {
        ...state,
        consoleBuffer: updatedConsoleBuffer,
        consoleEntries: state.consoleEntries.concat(bufferEntry),
      };
    }

    case ConsoleActionTypes.SetChoices:
        return {
          ...state,
          consoleChoices: action.payload,
        };

    default:
      return state;
  }
}
