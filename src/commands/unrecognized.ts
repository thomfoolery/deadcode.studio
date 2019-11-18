import { ConsoleEntryTypes } from '../reducers/console';

export default function unrecognized(cmd, args, state) {
  const options = { color: 'yellow' };

  return {
    ...state,
    consoleEntries: state.consoleEntries.concat([
      {
        type: ConsoleEntryTypes.Output,
        content: [
          `'${cmd}' is not a recognized cmd. Type 'help' for more options.`,
          ' ',
        ].join('\n'),
        options,
      },
    ]),
  };
}
