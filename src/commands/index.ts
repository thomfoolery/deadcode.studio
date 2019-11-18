import { ConsoleEntryTypes } from '../reducers/console';
import unrecognized from './unrecognized';

import cd from './cd';
import ls from './ls';
import pwd from './pwd';
import help from './help';

const COMMAND_DICTIONARY = {
  // scan,
  // find,
  cd,
  ls,
  pwd,
  help,
}

const COMMAND_LIST = Object.keys(COMMAND_DICTIONARY);

export function executeConsoleCommand(state, value) {
  const [cmd, ...args] = value.split(' ');

  if (!COMMAND_LIST.includes(cmd)) {
    return unrecognized(cmd, args, state);
  }

  const initialEntry = {
    type: ConsoleEntryTypes.Command,
    content: `${cmd} ${args.join(' ')}`,
  };

  const finalEntry = {
    type: ConsoleEntryTypes.Output,
    content: ` `,
  };

  const commandBuffer = state.commandBuffer.concat([cmd, ...args]);
  const consoleEntries = state.consoleEntries.concat(initialEntry);
  const fn = COMMAND_DICTIONARY[cmd];

  const newState = fn(args, { ...state, commandBuffer, consoleEntries });

  return {
    ...newState,
    consoleEntries: newState.consoleEntries.concat(finalEntry),
  }
}