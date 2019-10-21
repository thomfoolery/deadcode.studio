import { executeConsoleCommand } from './console-commands';

export enum ActionTypes {
  SetIsConsoleEnabled = 'SetIsConsoleEnabled',
  ExecuteCommand = 'ExecuteCommand',
  AppendToConsole = 'AppendToConsole',
  AppendToBuffer = 'AppendToBuffer',
  AdvanceBuffer = 'AdvanceBuffer',
  UpdateSelectedChoice = 'UpdateSelectedChoice',
  SetChoices = 'SetChoices',
}

export interface IAction {
  type: ActionTypes;
  payload?: any;
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

export interface IChoice {
  isSelected: boolean;
  content: string;
  index: number;
}

export interface IConsoleState {
  isConsoleEnabled: boolean;
  choices: IChoice[] | null,
  commandBuffer: string[];
  consoleBuffer: IConsoleEntry[];
  consoleEntries: IConsoleEntry[];
}

export const defaultState: IConsoleState = {
  isConsoleEnabled: false,
  choices: null,
  commandBuffer: [],
  consoleBuffer: [],
  consoleEntries: [],
};

export function stateReducer(state: IConsoleState, action: IAction) {
  switch(action.type) {

    case ActionTypes.SetIsConsoleEnabled:
      return {
        ...state,
        isConsoleEnabled: action.payload,
      };

    case ActionTypes.ExecuteCommand:
      return executeConsoleCommand(state, action.payload);

    case ActionTypes.AppendToConsole: {
      return {
        ...state,
        consoleEntries: state.consoleEntries.concat(action.payload),
      };
    }

    case ActionTypes.AppendToBuffer: {
      const firstBufferEntry = action.payload[0];
      const bufferEntries = action.payload.slice(1);

      return {
        ...state,
        consoleBuffer: state.consoleBuffer.concat(bufferEntries),
        consoleEntries: state.consoleEntries.concat(firstBufferEntry),
      };
    }

    case ActionTypes.AdvanceBuffer: {
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

    case ActionTypes.SetChoices:
        return {
          ...state,
          choices: action.payload,
        };

    default:
      return state;
  }
}
