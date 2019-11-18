import { ConsoleEntryTypes } from '../reducers/console';
import { getFolder } from './utils';
import { init } from 'ramda';

function getPwd(path, pwd) {
  if (path[0] === '/') {
    return path;
  } else {
    return path.split('/').reduce((acc, p) => {
      if (p === '.') {
        return acc;
      }
      else if (p === '...') {
        return init(acc);
      }
      else {
        return acc.concat(p)
      }
    }, pwd)
  }
}

export default function cd([path], state): any {
  const options = { color: 'yellow' };
  const pwd = getPwd(path, state.gameServerPwd);
  const isValid = !!getFolder(state.gameServer.filesystem, pwd);
  const gameServerPwd = !isValid ? state.gameServerPwd : pwd;

  return {
    ...state,
    gameServer: {
      ...state.gameServer,
    },
    gameServerPwd,
    consoleEntries: state.consoleEntries.concat([
      {
        type: ConsoleEntryTypes.Output,
        content: !isValid ?
          `  invalid directory path: ${path}` :
          `  ${pwd}`,
        options,
      },
    ]),
  };
}
