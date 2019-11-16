import { executeConsoleCommand } from './console-commands';

export enum GameState {
  GameTitle,
  GamePaused,
  GamePlaying,
}

export enum ActionTypes {
  SetIsConsoleEnabled = 'SetIsConsoleEnabled',
  ExecuteCommand = 'ExecuteCommand',
  AppendToConsole = 'AppendToConsole',
  AppendToBuffer = 'AppendToBuffer',
  AdvanceBuffer = 'AdvanceBuffer',
  UpdateSelectedChoice = 'UpdateSelectedChoice',
  SetChoices = 'SetChoices',
  Reset = 'Reset',
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

export interface IGameState {
  gameState: GameState;
  choices: IChoice[],
  commandBuffer: string[];
  consoleBuffer: IConsoleEntry[];
  consoleEntries: IConsoleEntry[];
}

export const defaultState: IGameState = {
  choices: [],
  commandBuffer: [],
  consoleBuffer: [],
  consoleEntries: [],
  gameState: GameState.GameTitle,
};

export function stateReducer(state: IGameState, action: IAction) {
  switch(action.type) {

    case ActionTypes.Reset:
      return defaultState;

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
