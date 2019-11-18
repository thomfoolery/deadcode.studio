import { ConsoleEntryTypes } from '../reducers/console';

export default function pwd(args, state): any {
  const options = { color: 'yellow' };

  return {
    ...state,
    consoleEntries: state.consoleEntries.concat([
      {
        type: ConsoleEntryTypes.Output,
        content: `  /${state.gameServerPwd.join('/')}`,
        options,
      },
    ]),
  };
}
