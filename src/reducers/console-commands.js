import { ConsoleEntryTypes } from './console';

const COMMAND_LIST = [
  'ls',
  'cd',
  'cat',
  'run',
  'pwd',
  'help',
  'scan',
  'users',
  'find',
  'search',
];

export function executeConsoleCommand(state, value) {
  if (value.trim() === '') {
    return {
      ...state,
      consoleEntries: state.consoleEntries.concat([
        {
          type: ConsoleEntryTypes.Command,
          content: ' ',
        },
      ]),
    };
  }

  const [cmd] = value.split(' ');
  const options = { color: 'yellow' };

  if (!COMMAND_LIST.includes(cmd)) {
    return {
      ...state,
      consoleEntries: state.consoleEntries.concat([
        {
          type: ConsoleEntryTypes.Command,
          content: cmd,
        },
        {
          content: [
            ' ',
            `'${cmd}' is not a recognized cmd. Type 'help' for more assistance.`,
            ' ',
          ].join('\n'),
          options,
        },
      ]),
    };
  }

  else {
    const commandBuffer = state.commandBuffer.concat(cmd);
    const initialEntry = {
      type: ConsoleEntryTypes.Command,
      content: cmd,
    };

    if (cmd.startsWith('help')) {
      return {
        ...state,
        commandBuffer,
        consoleEntries: state.consoleEntries.concat([
          initialEntry,
          {
            type: ConsoleEntryTypes.Output,
            content: [
              ' ',
              'ls     - list files',
              'cd     - change directory',
              'cat    - output a text file to screen',
              'run    - run an executable file',
              'pwd    - present working directory',
              'scan   - scan network for connected systems',
              'users  - scan system for connected users',
              'find   - find a connected user',
              'search - search file system for file',
              ' ',
            ].join('\n'),
            options,
          },
        ]),
      };
    }
    else {
      return {
        ...state,
        commandBuffer,
        consoleEntries: state.consoleEntries.concat([
          initialEntry,
          {
            content: [
              ' ',
              `'${cmd}' executed`,
              ' ',
            ].join('\n'),
            options,
          },
        ]),
      };
    }
  }
}