import { ConsoleEntryTypes } from '../reducers/console';

export default function help(args, state) {
  const options = { color: 'yellow' };

  return {
    ...state,
    consoleEntries: state.consoleEntries.concat([
      {
        type: ConsoleEntryTypes.Output,
        content: [
          'cd     - change directory',
          'ls     - list pwd contents',
          'pwd    - present working directory',
          'scan   - scan network for connected systems',
          'find   - scan system for connected users',
          'chat   - private communication channel',
        ].join('\n'),
        options,
      },
    ]),
  };
}
