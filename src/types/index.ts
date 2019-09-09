export enum ICommandTypes {
  Block,
  Inline,
}

export interface ICommandOptions {
  animation: {
    type?: ICommandTypes;
    speed?: number;
    duration?: number;
  };
};

export interface ICommand {
  content: string | ICommand | any[];
  options: ICommandOptions;
};

export enum ConsoleEntryTypes {
  Output = 'output',
  Command = 'command',
}

export interface IConsoleBufferEntry {
  type: ConsoleEntryTypes;
  content: string;
}

export interface IConsoleState {
  consoleEntries: IConsoleBufferEntry[];
}
